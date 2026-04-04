FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY ["backend-member.csproj","./"] 
RUN dotnet restore 

COPY . .
RUN dotnet build "backend-member.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "backend-member.csproj" -c Release -o /app/publish /p:UseAppHost=false
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app
EXPOSE 8080

COPY --from=publish /app/publish .
ARG ASPNETCORE_ENV=Development
ENV ASPNETCORE_ENVIRONMENT=${ASPNETCORE_ENV}

ENTRYPOINT ["dotnet", "backend-member.csproj"]
