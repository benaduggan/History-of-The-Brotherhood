from rest_framework import status
from rest_framework.decorators import list_route
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet

from accounts.models import Account
from accounts.serializers import AccountSerializer

class AccountViewSet(ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
    permission_classes = [IsAuthenticated]

    @list_route()
    def list_all(self, request):
        accounts = Account.objects.all()
        serializer = self.get_serializer(accounts, many=True)
        return Response(serializer.data)

class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = AccountSerializer(request.user)
        return Response(serializer.data)
