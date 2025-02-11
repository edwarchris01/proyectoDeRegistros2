let btn = document.getElementById('btn_personas');
btn.addEventListener('click',boton_personas);
function boton_personas(){
    Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
        width: '500px',       // Ajusta el ancho como prefieras
        position: 'center',    // Forzamos que se centre
        customClass: {
            popup: 'custom-center' // Clase personalizada para ajustar estilos en CSS
        }
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire("Saved!", "", "success");
        } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");
        }
    });
}