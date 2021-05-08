var grid=new Muuri(".grid",{
  layout:{
    rounding:false
  }

});


const removeAccents = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

window.addEventListener("load",()=>{
  grid.refreshItems().layout();

  document.getElementById("grid").classList.add("imagenes-cargadas");
  const enlaces=document.querySelectorAll("#categorias a");
  enlaces.forEach((elemento) => {
    elemento.addEventListener("click", (evento)=>{
      evento.preventDefault();
      enlaces.forEach((enlace)=> enlace.classList.remove("activo"));
      evento.target.classList.add("activo");

      const categoria=removeAccents(evento.target.innerHTML.toLowerCase());
      categoria==="todos"? grid.filter('[data-categoria]'): grid.filter(`[data-categoria="${categoria}"]`);

    });
  });

  document.querySelector("#barra-busqueda").addEventListener("input",(evento)=>{
    var busqueda=evento.target.value;
    grid.filter( (item)=> item.getElement().dataset.etiquetas.includes(busqueda));
  });

  //listener para las imágenes
  const overLay=document.getElementById("over-lay");
  document.querySelectorAll(".grid .item img").forEach((elemento)=>{


    elemento.addEventListener("click",()=>{
      const ruta=elemento.getAttribute("src");
      const descripcion=elemento.parentNode.parentNode.dataset.descripcion;

      overLay.classList.add("activo");
      document.querySelector("#over-lay img").src=ruta;

      document.querySelector("#over-lay .descripcion").innerHTML=descripcion;
    });

  });

  //eveent listener boton cerrar

  document.querySelector("#btn-cerrar-popup").addEventListener("click",()=>{
    overLay.classList.remove("activo");

  });
  overLay.addEventListener("click",(evento)=>{
    evento.target.id==="overlay" ? overLay.classList.remove("activo"):"";
  });






});
