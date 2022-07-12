#!/bin/bash

. ./unimelb-COMP90024-2022-grp-40-openrc.sh; ansible-playbook playbook.yaml --private-key=~mesl/.ssh/mesl.pem -vvvv
