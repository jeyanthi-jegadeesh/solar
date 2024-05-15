import React from 'react';
import { Box, Image, Heading, Text } from '@chakra-ui/react';
import './userStyles.css';

interface UserInfoProps {
    name: string;
    email: string;
    imageUrl: string;
}

const UserInfo: React.FC<UserInfoProps> = ({ name, email, imageUrl }) => {
    return (
        <Box
            className="user-info"
            gridArea="info"
            fontFamily="var(--font-mono)"
            p="20px"
            borderRadius="var(--border-radius)"
            boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap="10px"
            marginTop="3px"
            height="90%"
            justifyContent="space-between"
        >
            <Image
                src={imageUrl}
                alt="User"
                width="150px"
                height="150px"
                borderRadius="50%"
                objectFit="cover"
            />
            <Heading as="h2" size="md" m={0} fontSize="18px">
                {name}
            </Heading>
            <Text m={0} color="#718096">
                {email}
            </Text>
        </Box>
    );
};

export default UserInfo;
