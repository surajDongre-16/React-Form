import React from 'react'
import {
    Tbody,
    Tr,
    Td,
    Divider,
    Avatar,
  } from '@chakra-ui/react'
import styles from "./forms.module.css"



const TabelItem = ({list}) => {
    let marriedStatus;
    if(list.married==false || list.married==undefined){
        marriedStatus="Not Married"
    }
    else{
        marriedStatus="Married"
    }
  return (
    <>
        <Tbody>
            <Tr>
                <Td>{list.name}</Td>
                <Td isNumeric>{list.age}</Td>
                <Td>{list.address}</Td>
                <Td>{list.department}</Td>
                <Td isNumeric>{list.salary}</Td>
                <Td>{marriedStatus}</Td>
                <Avatar size='2xl' name='Segun Adebayo' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHfHsJ0gRyl8LGr5W-V-dq3jKf-iUoOynafQ&usqp=CAU' />{' '}
            </Tr>
        </Tbody>
        <Divider />
    </>
  )
}

export default TabelItem