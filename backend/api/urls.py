from django.urls import path

from api.views import FilterServers, GetReport, ListServer, DetailServer

urlpatterns = [
    path('servers/', ListServer.as_view()),
    path('servers/<int:pk>', DetailServer.as_view()),
    path('report/', GetReport.as_view()),
    path('filter/', FilterServers.as_view()),
]
