import React from 'react'
import '../../styles/home.css'
import cuteGirlImage from '../../assets/images/cute-freelance-girl-using-laptop-sitting-floor-smiling.jpg'
import logo1 from '../../assets/images/istockphoto-1339778028-612x612.jpg'
import logo2 from '../../assets/images/procedures-project-line-icon-with-checklist-vector.jpg'
import project from '../../assets/images/download (1).jfif'
import flag1 from '../../assets/images/download (2).png'
import flag2 from '../../assets/images/download.png'
import flag3 from '../../assets/images/flag-3d-round-250.png'

const Home = () => {
  return (
    <div>
      <section>
        <div className="container">
          <div className="row">
            <div className="d-flex  row justify-content-around">
              <div className="col-md-6 col-12 mb-3 textFirst ">
                <p className="text1 ">
                  Are you asking for a
                  <span className="text1Word">
                   
                    <br></br>freelancer ?
                  </span>
                </p>
                <p className="text2">
                  Explore thousands of jobs <br />
                  explore thousands of jobs
                  <br />
                  explore thousands of jobs
                </p>
                <div className="textDiv d-flex justify-content-center">
                  <p className="textWelcome">
                    <span className="text1Word">We</span>lome to our website
                  </p>
                  <button className="textbutton">Explore</button>
                </div>
              </div>
              <div className="col-md-5 col-12 imgDiv mt-5">
                <img
                  className="imgside"
                  src={cuteGirlImage}
                  alt="Girl in a jacket"
                  width="410"
                  height="450"
                ></img>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-5">
        <div className="container">
          <div className="row">
            <div className="d-flex  row justify-content-around">
              <div className="col-lg-6 col-12  projectSide row">
                <div className="col-12">
                  <img src={logo1} alt="logo1" className="logo1 m-5"></img>
                  <img src={logo1} alt="logo1" className="logo2 mt-5"></img>
                  <img src={logo2} alt="logo2" className="logo1 mb-5"></img>
                </div>
                <div className="col-12">
                <p className="projectText">
                  P<span className="projectColor">roject</span>s
                </p>
                </div>
                <div className="col-12 ">
                <img src={logo2} alt="logo2" className="logo2 mx-3"></img>
                <img src={logo1} alt="logo1" className="logo1 mb-5"></img>
                <img src={logo2} alt="logo2" className="logo2 mx-3"></img>
                </div>
              </div>

              <div className="col-lg-6 col-12 projectImg row">
              
                <img src={project} className="imgProject col-md-5 col-12"></img>
                <img src={project} className="imgProject col-md-5 col-12"></img>
                <img src={project} className="imgProject col-md-5 col-12"></img>
                <img src={project} className="imgProject col-md-5 col-12"></img>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="comSection">
        <div className="container">
          <div className="row">
            <p className="ComText">Our communities</p>
            <div className="d-flex row justify-content-center">
              <div className="col-md-3 col-12 comDiv">
                <img src={flag1} className="comImage1"></img>
                <p className="commText">MOROCCO</p>
              </div>
              <div className="col-md-3 col-12 comDiv">
                <img src={flag2} className="comImage2 "></img>
                <p className="commText">SAUDI</p>
              </div>
              <div className="col-md-3 col-12 comDiv">
                <img src={flag3} className="comImage3"></img>
                <p className="commText">UNITED STATES</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
