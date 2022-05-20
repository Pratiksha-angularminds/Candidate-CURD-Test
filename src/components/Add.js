import React,{useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

function Add() 
{
    let navigate = useNavigate()
    let [Employee,setEmployee] = useState({})
    let [SkillArray,setSkillArray] = useState([])
    let [ExperienceArray , setExperienceArray] = useState([])
    let [AllEmployee,setAllEmployee] = useState(JSON.parse(localStorage.getItem('employeeInfo'))|| [])
    // console.log(Employee)
    

    useEffect(() => {
        setExperienceArray(Array(2).fill({}))
    }, [])
    // console.log(ExperienceArray)

    const selectSkill = (e) =>
    {
        let exist = 0;
        if(SkillArray.length)
        {
            SkillArray.map((s,i) =>
            {
               
                if(s == e.target.value)
                {
                    SkillArray.splice(i,1)
                    exist = 1
                }
                
            })
            exist === 0 && SkillArray.push(e.target.value)
        } 
        else
        {
            SkillArray.push(e.target.value)
        }
        isEmpty('skills')
    }
   

    const handleExperience = (e,ind) =>
    {
        
            let {name,value} = e.target
            let Obj = {
                ...ExperienceArray[ind],
                [name]:value
            }
            ExperienceArray[ind] = Obj
            setExperienceArray([...ExperienceArray])
    }

    const removeExperience = (ind) =>
    {
        if(ExperienceArray.length<=2)
        {
            alert("Minimum 2 experience are required")
        }
        else
        {
            let Obj = [...ExperienceArray]
            Obj.splice(ind,1)
            // ExperienceArray=ExperienceArray.filter((exp,i)=> i!=ind)
            setExperienceArray(Obj)
            // console.log(Obj)
        }
       
    }
    
    const isValid = (field) =>
    {
        let flag=1
        
        if(Employee.fname == '' || Employee.fname == undefined)
        {
            document.getElementById('fname').style.display = "block";
            document.getElementById('fname').className = "is-invalid"
            flag = 0
            
        }
        if(Employee.lname == "" || Employee.lname == undefined)
        {
            document.getElementById('lname').style.display = "block";
            flag = 0
        }
        if(Employee.gender == "" || Employee.gender == undefined)
        {
            document.getElementById('gender').style.display = "block";
            flag = 0
        }
        if(Employee.email == "" || Employee.email == undefined)
        {
            document.getElementById('email').style.display = "block";
            flag = 0
        }
        if(Employee.address == "" || Employee.address == undefined)
        {
            document.getElementById('address').style.display = "block";
            flag = 0
        }
        if(Employee.country == "" || Employee.country == undefined)
        {
            document.getElementById('country').style.display = "block";
            flag = 0
        }
        if(Employee.state == "" || Employee.state == undefined)
        {
            document.getElementById('state').style.display = "block";
            flag = 0
        }
        if(Employee.pin == "" || Employee.pin == undefined)
        {
            document.getElementById('pin').style.display = "block";
            flag = 0
        }
        if(Employee.skills == "" || Employee.skills == undefined)
        {
            document.getElementById('skills').style.display = "block";
            flag = 0
        }
        Employee.experience.map((exp,i) =>
            {
                if(exp.companyName == '' || exp.companyName == undefined)
                {
                    document.getElementById(`companyName${i}`).style.display = "block";
                    flag = 0
                }
                if(exp.duration == "" || exp.duration == undefined)
                {
                    document.getElementById(`duration${i}`).style.display = "block";
                    flag = 0
                }
            })
        
        return flag
    }

    const isEmpty = (field ,value) =>
    {
        
        if(SkillArray.length<3 && field=='skills')
        {
            document.getElementById(`${field}`).style.display = "block"
        }
        else
        {
            document.getElementById(`${field}`).style.display = "none"
        }

        if(field!='skills' )
        {
            if(value=='' || value==0 )
            {
                document.getElementById(`${field}`).style.display = "block"
              
            }
            else
            {
                document.getElementById(`${field}`).style.display = "none"
            }
        }
    }

    const handleSubmit = () =>
    {
        Employee = ({...Employee , skills:SkillArray , experience : ExperienceArray})
        console.log(Employee)
        if(isValid())
        {
           
            setEmployee(Employee)
            AllEmployee.push(Employee)
            localStorage.setItem("employeeInfo",JSON.stringify(AllEmployee))
            navigate('/List')
        }
    }

    return (
                <div>
                    <div  className="container my-4">
                        <main>
                            <div className="py-5 text-center">
                                <h2>Add Candidate</h2>
                            </div>

                            <div className="row g-5">
                                <div className="col-md-7 col-lg-8 ms-auto me-auto">
                                    <h4 className="mb-3">Basic Info</h4>

                                    <div className="row g-3">
                                        <div className="col-sm-6">
                                            <label className="form-label">First name</label>
                                            <input type="text" className="form-control" onChange={(e)=>{setEmployee({...Employee,fname:e.target.value});isEmpty('fname',e.target.value)}} />
                                            <span id="fname" style={{color:"red",fontSize:"14px",display:'none'}}> first name is required</span>
                                        </div>

                                        <div className="col-sm-6">
                                            <label className="form-label">Last name</label>
                                            <input type="text" className="form-control" onChange={(e)=>{setEmployee({...Employee,lname:e.target.value});isEmpty('lname',e.target.value)}}/>
                                            <span id="lname" style={{color:"red",fontSize:"14px",display:'none'}}> last name is required</span>
                                        </div>

                                        <div className="col-12">
                                            <label className="form-label">Gender</label>
                                            <div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" value="Male" onChange={(e)=>{setEmployee({...Employee,gender:e.target.value});isEmpty('gender',e.target.value)}} checked={Employee ? Employee.gender==="Male" : false} />
                                                    <label className="form-check-label" >Male</label>
                                                </div>

                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" value="Female" onChange={(e)=>{setEmployee({...Employee,gender:e.target.value});isEmpty('gender',e.target.value)}} checked={Employee ? Employee.gender==="Female" : false}/>
                                                    <label className="form-check-label">Female</label>
                                                </div>

                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" value="Other" onChange={(e)=>{setEmployee({...Employee,gender:e.target.value});isEmpty('gender',e.target.value)}} checked={Employee ? Employee.gender==="Other" : false}/>
                                                    <label className="form-check-label">Other</label>
                                                </div>
                                            </div>
                                            <span id="gender" style={{color:"red",fontSize:"14px",display:'none'}}> gender is required</span>
                                        </div>

                                        <div className="col-12">
                                            <label className="form-label">Email</label>
                                            <input type="email" className="form-control" placeholder="you@example.com" onChange={(e)=>{setEmployee({...Employee,email:e.target.value});isEmpty('email',e.target.value)}}/>
                                            <span id="email" style={{color:"red",fontSize:"14px",display:'none'}}> email is required</span>
                                        </div>

                                        <div className="col-12">
                                            <label className="form-label">Address</label>
                                            <textarea className="form-control" placeholder="1234 Main St" onChange={(e)=>{setEmployee({...Employee,address:e.target.value});isEmpty('address',e.target.value)}}></textarea>
                                            <span id="address" style={{color:"red",fontSize:"14px",display:'none'}}> address is required</span>
                                        </div>


                                        <div className="col-md-5">
                                            <label className="form-label">Country</label>
                                            <select className="form-select" onChange={(e)=>{setEmployee({...Employee,country:e.target.value});isEmpty('country',e.target.value)}}>
                                                <option value="">Choose...</option>
                                                <option value="India">India</option>
                                                <option value="United States">United States</option>
                                            </select>
                                            <span id="country" style={{color:"red",fontSize:"14px",display:'none'}}> country is required</span>
                                        </div>

                                        <div className="col-md-4">
                                            <label className="form-label">State</label>
                                            <select className="form-select" onChange={(e)=>{setEmployee({...Employee,state:e.target.value});isEmpty('state',e.target.value)}}>
                                                <option value="">Choose...</option>
                                                <option value="Maharashtra">Maharashtra</option>
                                                <option value="Karnataka">Karnataka</option>
                                            </select>
                                            <span id="state" style={{color:"red",fontSize:"14px",display:'none'}}> state is required</span>
                                        </div>

                                        <div className="col-md-3">
                                            <label className="form-label">Pin / Zip</label>
                                            <input type="text" className="form-control" onChange={(e)=>{setEmployee({...Employee,pin:e.target.value});isEmpty('pin',e.target.value)}} />
                                            <span id="pin" style={{color:"red",fontSize:"14px",display:'none'}}> pin is required</span>
                                        </div>
                                    </div>

                                <hr className="my-4"/>

                                <h4 className="mb-3">Professional Info</h4>

                                <div className="row g-3">
                                    <div className="col-12">
                                    <label className="form-label">
                                        Choose your skills
                                        <span className="small text-muted">(min 3 skills)</span>
                                    </label>

                                    <div className="mb-3">
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="checkbox" value="Angular" onChange={(e)=> selectSkill(e)}/>
                                            <label className="form-check-label">Angular</label>
                                        </div>

                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="checkbox" value="React" onChange={(e)=> selectSkill(e)}/>
                                            <label className="form-check-label">React</label>
                                        </div>

                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="checkbox" value="Node.JS" onChange={(e)=> selectSkill(e)}/>
                                            <label className="form-check-label">Node.JS</label>
                                        </div>

                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="checkbox" value="JavaScript" onChange={(e)=> selectSkill(e)}/>
                                            <label className="form-check-label">JavaScript</label>
                                        </div>

                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="checkbox" value="Flutter" onChange={(e)=> selectSkill(e)}/>
                                            <label className="form-check-label">Flutter</label>
                                        </div>

                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="checkbox" value="Java" onChange={(e)=> selectSkill(e)}/>
                                            <label className="form-check-label">Java</label>
                                        </div>
                                        <span id="skills" style={{color:"red",fontSize:"14px",display:'none'}}> atleast 3 skills are required</span>
                                    </div>
                                    
                                    </div>
                                </div>

                                <div className="row gy-3">
                                    <div className="col-12">
                                    <label className="form-label">
                                        <strong>
                                        Experience
                                        <span className="small text-muted">(min 2, max 5 items)</span>
                                        </strong>
                                    </label>
                                    {ExperienceArray.map( (exp,i) =>
                                        <div className="card mx-3 mt-3" key={i}>
                                          
                                            <div className="card-body">
                                                <h6 className="card-title text-muted mb-3">
                                                    Experience #{i+1}
                                                    <a className="float-end text-danger fw-normal" onClick={()=> removeExperience(i)}>Remove</a>
                                                </h6>

                                                <div className="row g-3">
                                                    <div className="col-6">
                                                        <label className="form-label">Company Name</label>
                                                        <input type="text" className="form-control" value={Object(exp).length && exp.companyName } name="companyName" onChange={(e)=>{isEmpty(`companyName${i}`,e.target.value); handleExperience(e,i)}}/>
                                                        <span id={`companyName${i}`} style={{color:"red",fontSize:"14px",display:'none'}}> company name is required</span>
                                                    </div>

                                                    <div className="col-6">
                                                        <label className="form-label">Duration <span className="text-muted">(in months)</span></label>
                                                        <input type="number" name="duration" min="0" value={Object(exp).length && exp.duration } className="form-control" onChange={(e)=> {isEmpty(`duration${i}`,e.target.value);handleExperience(e,i)}}/>
                                                        <span id={`duration${i}`} style={{color:"red",fontSize:"14px",display:'none'}}> duration is required</span>
                                                    </div>

                                                    <div className="col-12">
                                                        <label className="form-label">Describe your responsibilities</label>
                                                        <textarea className="form-control" name="responsibilities"  value={Object(exp).length && exp.responsibilities } onChange={(e)=> handleExperience(e,i)}></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    

                                    <a className="d-block mt-3" onClick={()=> {
                                                                                    if(ExperienceArray.length>4)
                                                                                    {
                                                                                        alert("Maximum 5 experiencs are allowed")
                                                                                    }
                                                                                    else
                                                                                    {
                                                                                        setExperienceArray([...ExperienceArray,{}])
                                                                                    } 
                                                                                }}>Add more experience</a>
                                    </div>
                                </div>

                                <hr className="my-4"/>

                                <button className="btn btn-primary" type="submit" onClick={()=>handleSubmit()}>Save Candidate</button>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
    )
}

export default Add