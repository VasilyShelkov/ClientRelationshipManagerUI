#!/bin/bash
if grep -nr ".only(" test; then
  RED="\e[31m"
  echo -e "${RED}------------------------------------------------------------"
  echo -e "${RED}You left a .only in somewhere!!!!!!"
  echo -e "${RED}------------------------------------------------------------"
  exit 1
fi

if grep -nr "pause()" test; then
  RED="\e[31m"
  echo -e "${RED}------------------------------------------------------------"
  echo -e "${RED}You left a pause() in somewhere!!!!!!"
  echo -e "${RED}------------------------------------------------------------"
  exit 1
fi
