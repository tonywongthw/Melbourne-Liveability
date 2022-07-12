#!/bin/bash

ansible-playbook playbook.yaml --private-key=~mesl/.ssh/cloud.key -vvvv
