from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json

from .models import CollectionCenter

@csrf_exempt  
def user_location(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            latitude = data.get("latitude")
            longitude = data.get("longitude")

            print(f"사용자 위치 수신됨 - 위도: {latitude}, 경도: {longitude}")

            # DB 연동 테스트
            centers = CollectionCenter.objects.all()
            center_data = [
                {
                    "id": c.centerId,
                    "name": c.name,
                    "address": c.address,  
                    "latitude": c.latitude,
                    "longitude": c.longitude,
                    "opening_hour": c.opening_hour,
                    "closing_hour": c.closing_hour,
                    "phone": c.phone,
                }
                for c in centers
            ]

            return JsonResponse({"status": "ok", "message": "위치 데이터 발ㄴ신 완료!", "data": center_data})
        except json.JSONDecodeError:
            return JsonResponse({"status": "error", "message": "JSON 파싱 실패"}, status=400)

@csrf_exempt  
def select_location(request, centerId):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            latitude = data.get("latitude")
            longitude = data.get("longitude")

            print(f"사용자가 선택한 거점 위치 수신됨 - 위도: {latitude}, 경도: {longitude}")

            # DB 연동 테스트
            center  = CollectionCenter.objects.get(centerId=centerId)
            center_data = {
                "id": center.centerId,
                "name": center.name,
                "address": center.address,
                "latitude": center.latitude,
                "longitude": center.longitude,
                "opening_hour": center.opening_hour,
                "closing_hour": center.closing_hour,
                "phone": center.phone,
            }

            return JsonResponse({"status": "ok", "message": "선택 거점 위치 발신 완료!", "data": center_data})
        except CollectionCenter.DoesNotExist:
            return JsonResponse({"status": "error", "message": "JSON 파싱 실패"}, status=400)
