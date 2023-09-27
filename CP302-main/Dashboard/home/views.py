import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def my_post_view(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        print(data)
        farmsize = data['extrinsic']['farmsize']
        month = data['extrinsic']['month']
        greenfodderamount = data['extrinsic']['greenfodderamount']
        dryfodderamount = data['extrinsic']['dryfodderamount']
        maxT = data['extrinsic']['maxT']
        minT = data['extrinsic']['minT']
        meanT = data['extrinsic']['meanT']
        RH = data['extrinsic']['RH']
        rainfall = data['extrinsic']['rainfall']
        THI = data['extrinsic']['THI']
        district = data['extrinsic']['district']
        zone = data['extrinsic']['zone']
        greenfoddertype = data['extrinsic']['greenfoddertype']
        dryfoddertype = data['extrinsic']['dryfoddertype']

        age=data['intrinsic']['age']
        breed=data['intrinsic']['breed']
        age_calving=data['intrinsic']['age_calving']
        lactation_number=data['intrinsic']['lactation_number']

        for i in range(1, int(farmsize)+1):
            print("hey")
        
        # Do something with the parameters (e.g. save them to a database)
        # ...
        
        # Send a JSON response back to the client
        response_data = {
            'message': 'Parameters received successfully',
            'params': {
                'farmsize': farmsize,
                
            }
        }
        return JsonResponse(response_data)
    
    # If the request method is not POST, return a 405 Method Not Allowed error
    return JsonResponse({'error': 'Method not allowed'}, status=405)
