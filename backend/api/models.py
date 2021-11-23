from django.conf import settings
from django.db import models

# Create your models here.
class Server(models.Model):
    name = models.CharField(verbose_name='Server Name', max_length=255, unique=True, null=False)
    ip_address = models.CharField(verbose_name='IP Address', 
        max_length=255, unique=True, null=False)
    is_up = models.BooleanField(verbose_name='Status', default=False)
    memory = models.CharField(verbose_name='Memory', max_length=255, null=False)
    server_type = models.CharField(verbose_name='Type', max_length=255, null=True)

    @property
    def status(self):
        _status = None
        if self.is_up:
            _status = settings.STATUS_UP
        else:
            _status = settings.STATUS_DOWN
    
        return _status

    def __str__(self) -> str:
        return f'''
            Server(
                {self.name!r},
                {self.ip_address!r},
                {self.status!r},
                {self.memory!r}
            )
        '''

    @property
    def data(self):
        _data = [
            self.id,
            self.ip_address,
            self.name,
            self.memory,
            self.server_type,
            self.status,
            self.is_up
        ]
        return _data
