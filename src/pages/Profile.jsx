import React from 'react'
import { Avatar } from "@chakra-ui/avatar";
import { Image } from "@chakra-ui/image";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useState } from "react";
 import LoggedUser from '../components/LoggedUser';

function Profile() {
  return (
    <>
    <LoggedUser/>
    </>
  )
}

export default Profile