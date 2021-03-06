/**
 * Copyright 2017 PhenixP2P Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define([
    'sdk/authentication/AuthenticationService',
    '../../../test/mock/mockPCast'
], function (AuthenticationService, MockPCast) {
    describe('When instantiating an Authentication Service', function () {
        var pcast;
        var authenticationService;

        beforeEach(function () {
            pcast = new MockPCast();
            authenticationService = new AuthenticationService(pcast);
        });

        describe('When asserting authorized', function () {
            it('Error thrown when status and sessionId invalid', function () {
                pcast.getObservableStatus().setValue('online');
                pcast.getProtocol().getObservableSessionId().setValue('');

                expect(function () {
                    authenticationService.assertAuthorized();
                }).to.throw(Error);
            });

            it('Error thrown when status invalid', function () {
                pcast.getObservableStatus().setValue('offline');

                expect(function () {
                    authenticationService.assertAuthorized();
                }).to.throw(Error);
            });

            it('Error thrown when sessionId invalid', function () {
                pcast.getProtocol().getObservableSessionId().setValue('');

                expect(function () {
                    authenticationService.assertAuthorized();
                }).to.throw(Error);
            });

            it('No Error thrown when status and sessionId valid', function () {
                expect(function () {
                    authenticationService.assertAuthorized();
                }).to.not.throw();
            });
        });
    });
});