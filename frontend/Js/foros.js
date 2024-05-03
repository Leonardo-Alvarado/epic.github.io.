$(document).ready(function() {
    var publicaciones = [];
    var usuarioLikes = {};

    function mostrarPublicaciones() {
      var contenidoPublicaciones = '';
      publicaciones.forEach(function(publicacion, index) {
        contenidoPublicaciones += `
          <div class="publicacion">
            <h3>${publicacion.titulo}</h3>
            <p>${publicacion.mensaje}</p>
            <div class="interacciones">
              <button class="btn-interaccion megusta ${usuarioLikes[index] ? 'liked' : ''}" data-index="${index}"><i class="fas fa-heart"></i> ${publicacion.likes}</button>
              <button class="btn-interaccion editar">Editar</button>
            </div>
          </div>
        `;
      });
      $('#publicaciones').html(contenidoPublicaciones);
    }

    function toggleLike(index) {
      if (usuarioLikes[index]) {
        publicaciones[index].likes--;
        delete usuarioLikes[index]; 
      } else {
        publicaciones[index].likes++;
        usuarioLikes[index] = true; 
      }
      mostrarPublicaciones();
    }

    $(document).on('click', '.megusta', function() {
      var index = $(this).data('index');
      toggleLike(index);
    });

    function mostrarFormularioEdicion(index) {
      var publicacion = publicaciones[index];
      $('#titulo-edicion').val(publicacion.titulo);
      $('#mensaje-edicion').val(publicacion.mensaje);
      $('#formulario-edicion').addClass('visible');
    }

    function ocultarFormularioEdicion() {
      $('#formulario-edicion').removeClass('visible');
    }

    $(document).on('click', '.editar', function() {
      var index = $(this).closest('.publicacion').index();
      mostrarFormularioEdicion(index);
    });

    $(document).on('click', '#cancelar-edicion', function() {
      ocultarFormularioEdicion();
    });

    $('#form-edicion').submit(function(event) {
      event.preventDefault();
      var index = $('#publicaciones .publicacion').index($('.publicacion'));
      var titulo = $('#titulo-edicion').val();
      var mensaje = $('#mensaje-edicion').val();
      publicaciones[index].titulo = titulo;
      publicaciones[index].mensaje = mensaje;
      mostrarPublicaciones();
      ocultarFormularioEdicion();
    });

    $('#form-publicacion').submit(function(event) {
      event.preventDefault();
      var titulo = $('#titulo').val();
      var mensaje = $('#mensaje').val();
      var nuevaPublicacion = {
        titulo: titulo,
        mensaje: mensaje,
        likes: 0
      };
      publicaciones.push(nuevaPublicacion);
      mostrarPublicaciones();
      $('#titulo').val('');
      $('#mensaje').val('');
    });

    mostrarPublicaciones();
});
