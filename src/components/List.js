import React,{useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

function List() 
{
    let navigate = useNavigate()
    let [AllEmployee,setAllEmployee] = useState(JSON.parse(localStorage.getItem('employeeInfo'))|| [])
    let totalExp = 0 
   

    const deleteEmployee = (ind) =>
    {
        AllEmployee.splice(ind,1)
        setAllEmployee([...AllEmployee])
        localStorage.setItem('employeeInfo',JSON.stringify([...AllEmployee]))
    }
    return (
            <div>
                <div className="container my-4">
                    <main>
                        <div className="py-5">
                            <h2>
                                Candidates List 
                                <button className="btn btn-primary float-end" onClick={()=>navigate('/Add')}>Add Candidate</button>
                            </h2>
                        </div>

                        <div className="row">
                            <div className="col-12 ms-auto me-auto">
                                <div className="card">
                                    <div className="card-body">
                                        <table className="table">
                                            
                                                <tr>
                                                    <th>#</th>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Number of Skills</th>
                                                    <th>Total Work Experience (in months)</th>
                                                    <th>Actions</th>
                                                </tr>
                                            
                                            
                                                {AllEmployee.length && AllEmployee.map( (emp,ind) =>
                                                    <tr key={ind}>
                                                            <td>{ind+1}</td>
                                                            <td>{emp.fname} { emp.lname}</td>
                                                            <td>{emp.email}</td>
                                                            <td>{emp.skills.length}</td>
                                                            <td>
                                                                { emp.experience.map(exp => exp.duration).reduce((a,b) =>
                                                                    parseInt(a)+ parseInt(b) 
                                                                )}
                                                            </td>

                                                        <td>
                                                            <a >Edit</a>
                                                            <a className="text-danger ms-2" onClick={()=>deleteEmployee(ind)}>Delete</a>
                                                        </td>
                                                    </tr>
                                                )}
                                            
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
  )
}

export default List