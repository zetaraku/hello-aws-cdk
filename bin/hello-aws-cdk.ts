#!/usr/bin/env node
import 'source-map-support/register';
import * as CDK from 'aws-cdk-lib';
import { HelloAwsCdkStack } from '../lib/HelloAwsCdkStack';

const app = new CDK.App();
const stack = new HelloAwsCdkStack(app, 'HelloAwsCdkStack');
