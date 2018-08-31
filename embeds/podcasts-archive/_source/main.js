;(function ( global ) {
  //Move the container outside of the standard list element
  console.log("RUNNING")
  let sliceWrapper = document.querySelector('#from-the-archive .fc-slice-wrapper');
  let directoryWrapper = document.querySelector('#from-the-archive .podcasts-archive__wrapper');
  sliceWrapper.appendChild(directoryWrapper);

  sliceWrapper.removeChild(sliceWrapper.querySelector("ul"))

}((typeof window !== 'undefined') ? window : this ));
