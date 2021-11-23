from rest_framework import serializers
from api.models import Server


class ServerSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Server
        fields = ['id', 'name', 'ip_address',
            'memory', 'server_type', 'is_up', 'status']
        extra_kwargs = {
            'is_up': {'write_only': True}
        }
