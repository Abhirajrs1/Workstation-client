import React from 'react'


function Footer() {
  return (
    <div className='bg-dark'>
    {/* <div className='container'> */}
        <div className='row py-5 text-white'>
      <div className='col-md-3 col-sm-12'>
        <h4 className='text-warning'>Company Name</h4>
        <p>WORK STATION</p>
      </div>
      <div className='col-md-3 col-sm-12'>
        <h4 className='text-warning'>Services</h4>
        <p>About</p>
        <p>Countact Us</p>
        <p>Post a job</p>
      </div>
      <div className='col-md-3 col-sm-12'>
         <h4  className='text-warning'>Useful Links</h4>
         <p>Shipping</p>
      </div>
      <div className='col-md-3 col-sm-12'>
        <h4  className='text-warning'>Address</h4>
        <p>WorkStation,Palarivattom,Kochi-3</p>
        <p>PH:9874563210</p>
      </div>
   </div>
   <div className="copyright-container d-flex justify-content-center align-items-center pb-3">
  <p className="text-white">© Copyright WorkStation 2024</p>
</div>    
</div>
    // </div>
  )
}

export default Footer
