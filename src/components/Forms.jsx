import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Tables from './Tables'
import {
    Checkbox,
    FormControl,
    FormLabel,
    Heading,
    Input,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Select,
    Stack,
  } from '@chakra-ui/react'

  import {
    Table,
    Thead,
    Tr,
    Th,
    TableContainer,
  } from '@chakra-ui/react'
import { PhoneIcon, AddIcon, WarningIcon } from '@chakra-ui/icons'
import { Button, ButtonGroup } from '@chakra-ui/react'
import styles from "./forms.module.css"
import TabelItem from './TabelItem'
import axios from "axios"



const Forms = () => {

    const [newEntery,setNewEntery]=useState({})
    const [userInfo,setUserInfo]=useState([])
    const [page,setPage]=useState(1)
    const [limit,setLimit]=useState(5)
    const [totalCount,setTotalCount]=useState(0)
    const [sort,setSort]=useState("")
    const [filter,setFilter]=useState("")

    const saveInfo=(e)=>{
        e.preventDefault()

        fetch(`http://localhost:8080/forms?_sort=salary&_order=${sort}&_page=${page}&_limit=${limit}&department=${filter}`,{
            method : "POST",
            headers:{
                "content-type":"application/json",
            },
            body:JSON.stringify({
                name: newEntery.name,
                age: newEntery.age,
                address: newEntery.address,
                department: newEntery.department,
                salary:Number(newEntery.salary),
                married: newEntery.married,
                profilepic:"https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659652__340.png"
            })
        })
        .then((res)=>res.json())
        .then((data)=>{    
            setUserInfo([...userInfo,data])
        
        })
        setNewEntery({})
    }

    useEffect(()=>{
        filter===""? axios.get(`http://localhost:8080/forms?_sort=salary&_order=${sort}&_page=${page}&_limit=${limit}`)
        .then((res)=>{
            setUserInfo(res.data)
            setTotalCount(Number(res.headers["x-total-count"]))
        })
        : 
        axios.get(`http://localhost:8080/forms?_sort=salary&_order=${sort}&_page=${page}&_limit=${limit}&department=${filter}`)
        .then((res)=>{
        setUserInfo(res.data)
        setTotalCount(Number(res.headers["x-total-count"]))
    })
    },[page,limit,sort,filter])
       

    const handleChange=(e)=> {
        let {name, checked, type, value, files}= e.target
        if(type==="checkbox"){
            setNewEntery({
                ...newEntery,
                [name]:checked,
            })
        }
        else if(type==="file"){
            setNewEntery({
                ...newEntery,
                [name]:files,
            })
        }
        else{
            setNewEntery({
                ...newEntery,
                [name]:value,
            })
        }
    }

  return (
    <div>
        
        <form onSubmit={saveInfo} className={styles.form}>
            <Heading>React Form</Heading>
            <br />
            <FormControl isRequired>
                <FormLabel htmlFor='first-name'>First name</FormLabel>
                <Input name='name' placeholder='Enter Full Name' onChange={handleChange} />
                <FormLabel htmlFor='first-name'>Age</FormLabel>
                <NumberInput  size='lg' maxW={32} defaultValue={''}>
                <NumberInputField name='age' type="number" onChange={handleChange} />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
                <FormLabel htmlFor='Address'>Address</FormLabel>
                <Input name='address' type="text" placeholder='Enter Address' onChange={handleChange} />
                <FormLabel htmlFor='first-name'>Department</FormLabel>
                    <Select name='department'  placeholder='Select option' onChange={handleChange}>
                        <option value='UI Designer'>UI</option>
                        <option value='UX Designer'>UX</option>
                        <option value='Full Stack Developer'>Full Stack Developer</option>
                        <option value='Front-End'>Front-End</option>
                        <option value='Back-End'>Back-End</option>

                    </Select>
                <FormLabel htmlFor='first-name'>Salary</FormLabel>
                <NumberInput size='lg' maxW={72} defaultValue={0}>
                    <NumberInputField name='salary' type="number" onChange={handleChange} />
                </NumberInput>
                <FormLabel htmlFor='first-name' isRequired={false}>Maritial Status</FormLabel>
                <Stack spacing={[1, 5]} direction={['column', 'row']}>
                    <Checkbox name='married' type="checkbox" size='lg' colorScheme='orange' isRequired={false} isChecked={newEntery.checked} onChange={handleChange}>
                        Married
                    </Checkbox>
                </Stack>
                <FormLabel htmlFor='profile-picture'>Profile Picture</FormLabel>
                <Input name="profilepic" type="file" placeholder='select file' onChange={handleChange} />
            </FormControl>
            <br />
            <Button type="submit" colorScheme='purple'>Submit</Button>
        </form>
        
        <div className={styles.btns}>
        
        <Button type="submit" colorScheme='purple' disabled={page==1} onClick={()=>setPage(page-1)}>Previous</Button>    
        <Select onChange={(e)=>setLimit(e.target.value)}
        bg='tomato'
        borderColor='tomato'
        color='white'
        width='150px'
        >
            <option value={4}>page limit</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
        </Select>
        <Button type="submit" colorScheme='purple' disabled={totalCount < page * limit } onClick={()=>setPage(page+1)}>Next</Button>    
        </div>
        <Heading>Employee Details</Heading>
        <br />
        <div className={styles.options}>
            <Select onChange={(e)=>setSort(e.target.value)}
            bg='tomato'
            borderColor='tomato'
            color='white'
            width='150px'
            >
                <option value="">Sort By Salary</option>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </Select>
            <Select onChange={(e)=>setFilter(e.target.value)}
            bg='tomato'
            borderColor='tomato'
            color='white'
            width='150px'
            >
                <option value="">Filter By Department</option>
                <option value="">Show All</option>
                <option value="UX Designer">UX</option>
                <option value="UI Designer">UI</option>
                <option value="Front-End">Front-End</option>
                <option value="Back-End">Back-End</option>
                <option value="Full Stack Developer">Full Stack Developer</option>
            </Select>
        </div>
        
        <Tables>
            <TableContainer>
                <Table variant='striped' colorScheme='purple'>
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th isNumeric>Age</Th>
                            <Th>Address</Th>
                            <Th>Department</Th>
                            <Th isNumeric>Salary</Th>
                            <Th>Marital State</Th>
                            <Th>Profile Photo</Th>
                        </Tr>
                    </Thead>
                    {userInfo.map((list)=>(
                        <TabelItem key={list.id} list={list} />
                    ))}
                </Table>
            </TableContainer>
        </Tables>
    </div>
  )
}

export default Forms