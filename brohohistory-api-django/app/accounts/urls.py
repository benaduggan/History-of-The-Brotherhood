from django.conf.urls import url
from accounts.views import *

list = {'get': 'list', 'post': 'create'}
detail = {'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}


urlpatterns = [
        url(r'^$', AccountViewSet.as_view(list), name="AccountList"),
        # url(r'^me/$', CurrentUserView.as_view(), name="CurrentUser"),

        # url(r'^account/all/$', AccountViewSet.as_view({'get': 'list_all'}), name="AccountListAll"),
        # url(r'^account/(?P<pk>\d+)/$', AccountViewSet.as_view(detail), name='Account'),
]