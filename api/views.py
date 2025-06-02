from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json, math
#from django.views.decorators.http import require_GET



from .models import CollectionCenter, CollectionHistory, Users


# MAP API
@csrf_exempt  
def user_location(request):
    # user 근처 2km 내의 쓰레기통만 보여줌
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
                    "id": c.center_id,
                    "name": c.name,
                    "address": c.address,  
                    "latitude": c.latitude,
                    "longitude": c.longitude,
                    "opening_hour": c.opening_hour,
                    "closing_hour": c.closing_hour,
                    "phone": c.phone,
                    "imageUrl": c.imageUrl,
                }
                for c in centers
            ]

            return JsonResponse({"status": "ok", "message": "위치 데이터 발신 완료!", "data": center_data})
        except json.JSONDecodeError:
            return JsonResponse({"status": "error", "message": "JSON 파싱 실패"}, status=400)

@csrf_exempt  
def select_location(request, centerId):
    # 사용자 선택 거점 보여줌 -> 사실 필요없을지도
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            latitude = data.get("latitude")
            longitude = data.get("longitude")

            print(f"사용자가 선택한 거점 위치 수신됨 - 위도: {latitude}, 경도: {longitude}")

            # DB 연동 테스트
            center  = CollectionCenter.objects.get(center_id=centerId)
            center_data = {
                "id": center.center_id,
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


@csrf_exempt       
def user_arrive(request):
    if 'user_id' not in request.session:
        return JsonResponse({'error': '로그인이 필요합니다.'}, status=401)

    try:
        data = json.loads(request.body)
        user_id = request.session['user_id']

        user_latitude = float(data.get('user_latitude'))
        user_longitude = float(data.get('user_longitude'))
        center_id = data.get('center_id','0')
        reward_point = float(data.get('reward_point', 0))
        collection_amount = float(data.get('collection_amount', 1))
        carbon_amount = float(data.get('carbon_amount', 1))

        try:
            center = CollectionCenter.objects.get(center_id=center_id)
        except CollectionCenter.DoesNotExist:
            return JsonResponse({'error': '지정한 수거함을 찾을 수 없습니다.'}, status=404)

        distance = euclidean_distance(user_latitude, user_longitude, center.latitude, center.longitude)

        CollectionHistory.objects.create(
            user_id=user_id,
            status='도착',
            center_id=center_id,
            start_latitude=str(user_latitude),
            start_longitude=str(user_longitude),
            distance_walk=distance,
            collection_amount=collection_amount,
            carbon_amount=carbon_amount,
            point=reward_point,
        )
        
        print("user arrive : ", reward_point, reward_point)

        return JsonResponse({'message': '기록이 저장되었습니다.', 'distance_km': distance}, status=201)

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=400)
    





@csrf_exempt       
def user_depart(request):
    # 사용자가 출발 버튼 누를 시 상태 저장
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            # center_id = CollectionCenter.objects.get(pk=1)
            center_id = data.get("center_id")
            collection_amount = data.get("collection_amount")
            start_latitude = data.get("start_latitude")
            start_longitute = data.get("start_longitute")
            
            # center_id= CollectionCenter.objects.get(pk=center_id)
            
            # CollectionHistory DB 생성
            CollectionHistory.objects.create(
                user_id = "2021075323",
                status = "진행 중",
                center_id = center_id,
                start_latitude = start_latitude,
                start_longitude = start_longitute,
                collection_amount = collection_amount,
            )
            
            return JsonResponse({"message": "출발 가보자고", "status": "success"})
        
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
            # return JsonResponse({"message": "오류 return"}, status=400)
    
# @csrf_exempt
# def user_arrive(request):
#     # 사용자가 도착시 버튼 누르면 작동
#     if request.method == "POST":
#         try:
#             data = json.loads(request.body)
            
#             # 사용자 현 위치 받기
#             user_latitude = float(data.get("user_latitude"))
#             user_longitude = float(data.get("user_longitude"))
            
#             # 고정값...
#             user_id = "2021075323"
#             history_id = 1
            
            
#             # 사용자 위치와 설정 거점 거리 비교하기
#             history = CollectionHistory.objects.get(pk =history_id, user_id=user_id)
#             center = CollectionCenter.objects.get(center_id=history.center_id)
            

#            # 거리계산
#             distance = abs(user_latitude - center.latitude) * 111000 + abs(user_longitude - center.longitude) * 88000 
           
#             if distance <= 50:
#                 history.status = "완료"
#                 history.diatance_walk = distance
#                 history.save()
               
#                 return JsonResponse({"message": "도착 완료", "status": "arrived"})
            
#             else:
#                 return JsonResponse({"message": "거리 부족", "status": "not_arrived"})
           
#         except Exception as e:
#             return JsonResponse({"error": str(e)}, status=400)
        
def euclidean_distance(lat1, lon1, lat2, lon2):
    lat1, lon1, lat2, lon2 = map(float, (lat1, lon1, lat2, lon2))
    delta_lat = lat2 - lat1
    delta_lon = lon2 - lon1
    distance = math.sqrt(delta_lat**2 + delta_lon**2) * 111000  # 미터 단위 변환
    return distance



# SIGN UP
@csrf_exempt
def signup(request):
    if request.method == "POST":
        print("signup1")
        try:
            data = json.loads(request.body)
            email = data.get("email")
            password = data.get("password")

            # 이메일 중복 체크
            if Users.objects.filter(email=email).exists():
                return JsonResponse({"message": "이미 존재하는 이메일입니다."}, status=400)

            # 유저 생성
            new_user = Users.objects.create(
                id=email,  # 기본키로 이메일을 사용한다고 가정
                username=email.split("@")[0],
                password=password,
                email=email,
                phone="00000000000",  # 기본값 처리 (또는 프론트에서 추가)
                total_collect_amount=0,
                total_carbon_reduction=0,
                points=0
            )
            print("signup2")
            return JsonResponse({"message": "회원가입이 완료되었습니다."}, status=201)
        except Exception as e:
            print("signup3")
            return JsonResponse({"message": str(e)}, status=500)

    return JsonResponse({"message": "허용되지 않은 메서드입니다."}, status=405)


@csrf_exempt
def login_view(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            id = data.get("username")
            password = data.get("password")

            user = Users.objects.filter(id=id, password=password).first()

            if user:
                request.session['user_id'] = user.id
                request.session.save()
            

                return JsonResponse({"message": "로그인 성공", "user_id": user.pk}, status=200)
            else:
                return JsonResponse({"message": "아이디 또는 비밀번호가 올바르지 않습니다."}, status=401)

        except Exception as e:
            return JsonResponse({"message": str(e)}, status=500)

    return JsonResponse({"message": "허용되지 않은 메서드입니다."}, status=405)


def logout_view(request):
    request.session.flush()
    return JsonResponse({"message": "로그아웃 완료"})

# api/views.py
from django.http import JsonResponse

def mypage_view(request):
    return JsonResponse({"message": "마이페이지입니다."})


@csrf_exempt  # 프론트에서 CSRF 토큰을 안 쓰는 경우
#@require_GET
def user_info(request):
    
    

    user_id = request.session.get('user_id')  # 세션에서 로그인된 사용자 ID를 가져옴
    
    
    print("user id : ", request.session.get('user_id'))

    if not user_id:
        return JsonResponse({'error': '로그인된 사용자가 없습니다.'}, status=401)

    try:
        user = Users.objects.get(id=user_id)
        data = {
            'id': user.id,
            'username': user.username,
            'phone': user.phone,
            'email': user.email,
            'total_collect_amount': user.total_collect_amount,
            'total_carbon_reduction': user.total_carbon_reduction,
            'points': user.points,
        }
        return JsonResponse(data)
    except Users.DoesNotExist:
        return JsonResponse({'error': '사용자 정보를 찾을 수 없습니다.'}, status=404)

