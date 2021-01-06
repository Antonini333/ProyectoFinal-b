# 📑 WisdomShare Backend 📑

## API Rest diseñada para controlar el flujo de información de la SPA WisdomShare:bulb:<br>

### 🔧 Herramientas utilizadas: 🔧
* NodeJs 
* Express
* MongoDB
* Mongoose as ORM 
* Heroku

### Dependencias:
* JsonWebToken
* Bcrypt
* Dotenv

#### 🆗 Testeada con Postman.
#### 🆙 Testéala tú también: 
 * [Heroku](http://wisdomshare.herokuapp.com/)
<br><br>

## 💻 Contenido:
<br>

### Se trata de un simple modelo MRC (Modelo, Ruta, Controlador). Siguiendo este orden:

### Modelos

+ #### User :curly_haired_woman:
* Contiene información básica del usuario, como nombre, apellido, número de teléfono, dirección... Además de campos que formarán parte imprescindible en la aplicación: biografía, foto, rol (administrador o usuario) y arrays de seguidores y seguidos.

+ #### Post :page_facing_up:
* Este modelo está diseñado de tal manera que no se necesiten más modelos para manejar eventos como likes o comentarios en determinado post. Por un lado contiene la información necesaria de un post (texto, categoría, usuario) y, por otro lado, un array que almacena los likes,y otro array que suple el modelo de comentarios, conteniendo campos similares al modelo de Post.

<br>
<br>

### :arrows_clockwise: Rutas:

### 👫 Users: 

<br>

* [Create](http://wisdomshare.herokuapp.com/user/register)   <br><br>

* [Read](http://wisdomshare.herokuapp.com/user)   <br><br>

* [Update](http://wisdomshare.herokuapp.com/user/update)   <br><br>

* [Delete](http://wisdomshare.herokuapp.com/user/delete)   <br><br>

* [Login](http://wisdomshare.herokuapp.com/login)   <br><br>

* [Logout](http://wisdomshare.herokuapp.com/logout)   <br><br>

* [Follow User](http://wisdomshare.herokuapp.com/user/follow/:_id)    <br><br>

* [Unfollow User](http://wisdomshare.herokuapp.com/user/unfollow/:_id)   <br><br>

* [Read all Users](http://wisdomshare.herokuapp.com/users)   <br><br>


### :page_facing_up: Posts: 

<br>

* [Create Post](http://wisdomshare.herokuapp.com/post)   <br><br>

* [Read Post](http://wisdomshare.herokuapp.com/readposts)   <br><br>

* [Update Post](http://wisdomshare.herokuapp.com/updatepost)   <br><br>

* [Delete Post](http://wisdomshare.herokuapp.com/deletepost/:_id)   <br><br>

* [Like Post](http://wisdomshare.herokuapp.com/likepost/:_id)   <br><br>

* [Unlike Post](http://wisdomshare.herokuapp.com/unlikepost/:_id)   <br><br>

* [Comment Post](http://wisdomshare.herokuapp.com/commentpost/:_id)    <br><br>

* [Read all Posts](http://wisdomshare.herokuapp.com/readallposts)   <br><br>

* [Read Cooking Posts](http://wisdomshare.herokuapp.com/readcookingposts)   <br><br> 

* [Read Lifestyle Posts](http://wisdomshare.herokuapp.com/readlifestyleposts)   <br><br>

* [Read News Posts](http://wisdomshare.herokuapp.com/readnewsposts)   <br><br> 

* [Read Tech Posts](http://wisdomshare.herokuapp.com/readtechposts)   <br><br> 

