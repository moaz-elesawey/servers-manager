from django.http.response import Http404, HttpResponse
from rest_framework import views
from rest_framework import response
from rest_framework import status

from api.models import Server
from api.serializers import ServerSerializer

from datetime import datetime

from api.utils import generate_csv_file

# Create your views here.

class ListServer(views.APIView):
    def get(self, request, format=None):
        servers = Server.objects.all()
        serializer = ServerSerializer(servers, many=True)
        return response.Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = ServerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return response.Response(serializer.data, status=status.HTTP_201_CREATED)
        return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DetailServer(views.APIView):

    def get_object(self, pk):
        try:
            return Server.objects.get(pk=pk)
        except Server.DoesNotExist:
            print('Not Found')
            raise Http404

    def get(self, request, pk, format=None):
        server = self.get_object(pk)
        serializer = ServerSerializer(server)
        return response.Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk, format=None):
        server = self.get_object(pk)
        serializer = ServerSerializer(server, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return response.Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        return response.Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        server = self.get_object(pk)
        server.delete()
        return response.Response(status=status.HTTP_204_NO_CONTENT)


class GetReport(views.APIView):
    def get(self, request):
        servers = Server.objects.all()
        print(servers)
        res = HttpResponse(
            content_type='text/csv',
            headers={'Content-Disposition': 'attachment; filename="[{}]-report.csv"'.format(datetime.utcnow())},
            )

        writer = generate_csv_file(res, servers)

        return res


class FilterServers(views.APIView):
    def get(self, request, format=None):
        server_status = request.GET.get('status', None)
        if server_status:
            is_up = server_status.split(' ')[-1]
            
            if is_up == 'UP':
                servers = Server.objects.filter(is_up=True)
            elif is_up == 'DOWN':
                servers = Server.objects.filter(is_up=False)
                print(servers)
            elif is_up == 'ALL':
                servers = Server.objects.all()
        
        serializer = ServerSerializer(servers, many=True)
        return response.Response(serializer.data, status=status.HTTP_200_OK)
