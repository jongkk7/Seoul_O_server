## HTTP 통신 라이브러리
### retrofit

##### step 1.
> manifest
> ``` java
> <uses-permission android:name="android.permission.INTERNET"/>
> ```

##### step 2.
> build.gradle (Module:app)
> ``` java
> compile "com.squareup.retrofit2:retrofit:2.0.0"
> compile "com.squareup.retrofit2:converter-gson:2.0.0"
> ```

##### step 3.
> Make RestService class.
> ``` java
>public interface RestService {
>
>    String ENDPOINT = "Url path";
>
>
>@GET("경로")
>Call<Map<Object, Object>> 메소드명(@Path("lat") String lat, @Path("lon") String lon);
>
>@POST("경로")
>Call<Map<Object, Object>> login(@Body Map<Object, Object> body);
>
>
>   class Creator{
>        public static RestService newRestService(){
>
>            Gson gson = new GsonBuilder()
>                    .setDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")
>                    .create();
>            Retrofit retrofit = new Retrofit.Builder()
>                    .baseUrl(RestService.ENDPOINT_)
>                    .addConverterFactory(GsonConverterFactory.create(gson))             
>                    .client(SSLConnect.getInstance().createSSLClient())             
>                                                   // ssl(https) 사용시 주석해제할것
>                    .build();
>            return retrofit.create(RestService.class);
>       }
>   }
>}
> ```

##### step 4.
> RestService를 사용해서 http 통신
> ``` java
>RestService restService = new RestService.Creator().newRestService();
>final Call<Map<Object,Object>> call = restService.getUserInfo(~~~);
>call.enqueue(new Callback<Map<Object, Object>>() {
>            @Override
>            public void onResponse(Call<Map<Object, Object>> call, Response<Map<Object, Object>> response) {
>                if (!response.isSuccessful()) {
>                    Toast.makeText(activity, "Sorry, failed..", Toast.LENGTH_SHORT).show();
>                    return;
>                }
>
>                Map<Object, Object> body = response.body();
>                Map<Object, Object> one = (Map<Object, Object>) body.get("body");
>                Map<Object, Object> data = (Map<Object, Object>) one.get("data");
>
>                String name = (String)data.get("name");
>                String email = (String)data.get("email");
>                String profileUrl = (String)data.get("profileUrl");
>            }
>            @Override
>            public void onFailure(Call<Map<Object, Object>> call, Throwable t) {
>                Toast.makeText(activity, "Network Error : " + t.getMessage(),
>            }
>        });
> ```
