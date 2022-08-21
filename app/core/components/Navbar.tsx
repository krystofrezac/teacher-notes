import React, { useState } from 'react';

import { Routes } from '@blitzjs/next';
import { useMutation, useQuery } from '@blitzjs/rpc';
import { LogoutIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';

import logout from 'app/auth/mutations/logout';
import getCurrentUser from 'app/users/queries/getCurrentUser';

import Avatar from './Avatar';
import Button from './Button';
import Dropdown from './Dropdown';
import Flex from './Flex';
import Icon from './Icon';
import Modal, { ModalActions, ModalTitle } from './Modal';
import Spacer from './Spacer';

export interface NavbarProps {
  goToAppButton?: boolean;
}

export interface UserAvatarProps {
  goToAppButton?: boolean;
}

const UserAvatar: React.FC<UserAvatarProps> = props => {
  const [logoutDialog, setLogoutDialog] = useState(false);
  const [user, { isSuccess: isUserSuccess }] = useQuery(getCurrentUser, null, {
    suspense: false,
  });
  const router = useRouter();
  const [logoutMutation] = useMutation(logout);

  if (!user || !isUserSuccess)
    return (
      <Flex gap='1/2'>
        <Link href={Routes.RegisterPage()}>
          <Button element='a' size='sm'>
            Register
          </Button>
        </Link>
        <Link href={Routes.LoginPage()}>
          <Button element='a' variant='primary' size='sm'>
            Login
          </Button>
        </Link>
      </Flex>
    );

  return (
    <>
      <Modal open={logoutDialog}>
        <ModalTitle>Do you really want to logout?</ModalTitle>
        <ModalActions>
          <Button
            variant='ghost'
            onClick={(): void => {
              setLogoutDialog(false);
            }}
          >
            No
          </Button>
          <Button
            variant='error'
            onClick={async (): Promise<void> => {
              await logoutMutation();
              await router.push(Routes.HomePage());
            }}
          >
            Yes
          </Button>
        </ModalActions>
      </Modal>
      <Flex gap='1'>
        {props.goToAppButton && (
          <Link href={Routes.StudentsPage()}>
            <Button variant='primary' size='sm'>
              Go to app
            </Button>
          </Link>
        )}
        <Dropdown
          end
          trigger={
            <Button simple>
              <Avatar>{user.email[0]?.toUpperCase()}</Avatar>
            </Button>
          }
          options={[
            <Button
              key='logout'
              className='flex items-center text-error'
              simple
              onClick={(): void => {
                setLogoutDialog(true);
              }}
            >
              <Icon>
                <LogoutIcon />
              </Icon>
              Logout
            </Button>,
          ]}
        />
      </Flex>
    </>
  );
};

const Navbar: React.FC<NavbarProps> = props => {
  return (
    <div className='navbar bg-neutral shadow-xl rounded-box'>
      <div className='grow'>
        <Link href={Routes.HomePage()}>
          <Button
            className='normal-case text-white text-xl'
            element='a'
            variant='ghost'
          >
            Flashcards
          </Button>
        </Link>
      </div>
      <Spacer right='1'>
        <UserAvatar goToAppButton={props.goToAppButton} />
      </Spacer>
    </div>
  );
};

export default Navbar;
