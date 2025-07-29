import * as Location from 'expo-location';
import { Location as LocationType } from '../types';

const KAKAO_REST_API_KEY = 'YOUR_KAKAO_REST_API_KEY';

interface KakaoPlace {
  id: string;
  place_name: string;
  category_name: string;
  address_name: string;
  road_address_name: string;
  x: string; // longitude
  y: string; // latitude
  distance: string;
}

class LocationService {
  async getCurrentLocation(): Promise<LocationType | null> {
    try {
      // 위치 권한 요청
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        throw new Error('위치 권한이 거부되었습니다.');
      }

      // 현재 위치 가져오기
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      // 주소 변환
      const address = await this.reverseGeocode(
        location.coords.latitude,
        location.coords.longitude
      );

      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        address: address || '주소를 찾을 수 없습니다',
      };
    } catch (error) {
      console.error('현재 위치 가져오기 실패:', error);
      return null;
    }
  }

  async reverseGeocode(latitude: number, longitude: number): Promise<string | null> {
    try {
      const response = await fetch(
        `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}`,
        {
          headers: {
            Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
          },
        }
      );

      const data = await response.json();
      
      if (data.documents && data.documents.length > 0) {
        const address = data.documents[0];
        return address.road_address?.address_name || address.address?.address_name || null;
      }
      
      return null;
    } catch (error) {
      console.error('주소 변환 실패:', error);
      return null;
    }
  }

  async findNearbyPlaces(
    currentLocation: LocationType,
    category: string,
    radius: number = 1000
  ): Promise<LocationType[]> {
    try {
      // 카테고리 코드 매핑
      const categoryCode = this.mapCategoryToKakaoCode(category);
      
      const response = await fetch(
        `https://dapi.kakao.com/v2/local/search/category.json?category_group_code=${categoryCode}&x=${currentLocation.longitude}&y=${currentLocation.latitude}&radius=${radius}&sort=distance`,
        {
          headers: {
            Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
          },
        }
      );

      const data = await response.json();
      
      if (data.documents && data.documents.length > 0) {
        return data.documents.map((place: KakaoPlace) => ({
          latitude: parseFloat(place.y),
          longitude: parseFloat(place.x),
          address: place.road_address_name || place.address_name,
          placeName: place.place_name,
          category: place.category_name,
        }));
      }
      
      return [];
    } catch (error) {
      console.error('주변 장소 검색 실패:', error);
      return [];
    }
  }

  async searchPlaces(query: string, currentLocation?: LocationType): Promise<LocationType[]> {
    try {
      let url = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(query)}`;
      
      if (currentLocation) {
        url += `&x=${currentLocation.longitude}&y=${currentLocation.latitude}&sort=distance`;
      }

      const response = await fetch(url, {
        headers: {
          Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
        },
      });

      const data = await response.json();
      
      if (data.documents && data.documents.length > 0) {
        return data.documents.map((place: KakaoPlace) => ({
          latitude: parseFloat(place.y),
          longitude: parseFloat(place.x),
          address: place.road_address_name || place.address_name,
          placeName: place.place_name,
          category: place.category_name,
        }));
      }
      
      return [];
    } catch (error) {
      console.error('장소 검색 실패:', error);
      return [];
    }
  }

  private mapCategoryToKakaoCode(category: string): string {
    const categoryMap: { [key: string]: string } = {
      'convenience_store': 'CS2', // 편의점
      'cafe': 'CE7', // 카페
      'restaurant': 'FD6', // 음식점
      'supermarket': 'MT1', // 대형마트
      'mart': 'MT1', // 마트
      'book_store': 'SW8', // 서점
      'bank': 'BK9', // 은행
      'hair_salon': 'HP8', // 미용실
      'hospital': 'HP8', // 병원
      'pharmacy': 'PM9', // 약국
      'gas_station': 'OL7', // 주유소
      'parking': 'PK6', // 주차장
      'bus_station': 'SW8', // 지하철역,버스터미널
      'store': 'MT1', // 상점
      'street': 'SW8', // 기본값
    };
    
    return categoryMap[category] || 'SW8';
  }

  calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 6371; // 지구의 반지름 (km)
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c; // km 단위
    return distance * 1000; // m 단위로 변환
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI/180);
  }
}

export const locationService = new LocationService(); 