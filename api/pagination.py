from rest_framework.pagination import PageNumberPagination


class PageNumPagination(PageNumberPagination):
    page_size = 12
    page_query_param = 'page'
