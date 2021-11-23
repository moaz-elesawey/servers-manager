# Generated by Django 3.2.8 on 2021-10-28 20:15

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Server',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, unique=True, verbose_name='Server Name')),
                ('ip_address', models.CharField(max_length=255, unique=True, verbose_name='IP Address')),
                ('is_up', models.BooleanField(default=False, verbose_name='Status')),
                ('memory', models.CharField(max_length=255, verbose_name='Memory')),
                ('server_type', models.CharField(default='STATUS UP', max_length=255, null=True, verbose_name='Type')),
            ],
        ),
    ]