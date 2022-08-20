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
import Icon from './Icon';
import Modal, { ModalActions, ModalTitle } from './Modal';

const UserAvatar: React.FC = () => {
  const [logoutDialog, setLogoutDialog] = useState(false);
  const [user, { isSuccess: isUserSuccess }] = useQuery(getCurrentUser, null, {
    suspense: false,
  });
  const router = useRouter();
  const [logoutMutation] = useMutation(logout);

  if (!user || !isUserSuccess)
    return (
      <div className="flex gap-2">
        <Link href={Routes.RegisterPage()}>
          <Button element="a" size="sm">
            Register
          </Button>
        </Link>
        <Link href={Routes.LoginPage()}>
          <Button element="a" variant="primary" size="sm">
            Login
          </Button>
        </Link>
      </div>
    );

  return (
    <>
      <Modal open={logoutDialog}>
        <ModalTitle>Do you really want to logout?</ModalTitle>
        <ModalActions>
          <Button
            variant="ghost"
            onClick={(): void => {
              setLogoutDialog(false);
            }}
          >
            No
          </Button>
          <Button
            variant="error"
            onClick={async (): Promise<void> => {
              await logoutMutation();
              await router.push(Routes.HomePage());
            }}
          >
            Yes
          </Button>
        </ModalActions>
      </Modal>

      <Dropdown
        end
        trigger={
          <Button simple>
            <Avatar>{user.email[0]?.toUpperCase()}</Avatar>
          </Button>
        }
        options={[
          <Button
            key="logout"
            className="flex items-center text-error"
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
    </>
  );
};

const Navbar: React.FC = () => {
  return (
    <div className="navbar bg-neutral shadow-xl rounded-box">
      <div className="navbar-start">
        <Link href={Routes.HomePage()}>
          <Button
            className="normal-case text-white text-xl"
            element="a"
            variant="ghost"
          >
            Flashcards
          </Button>
        </Link>
      </div>
      <div className="navbar-end pr-4">
        <UserAvatar />
      </div>
    </div>
  );
};

export default Navbar;
