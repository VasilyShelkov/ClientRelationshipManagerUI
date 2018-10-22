import * as React from 'react';
import { Link, LinkProps } from 'react-router-dom';

export const ProfileLink = (props: LinkProps) => (
  <Link to="/account/profile" {...props} />
);

export const UnprotectedListLink = (props: LinkProps) => (
  <Link to="/account/names/unprotected" {...props} />
);

export const ClientListLink = (props: LinkProps) => (
  <Link to="/account/names/client" {...props} />
);
