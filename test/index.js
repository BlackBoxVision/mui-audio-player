import { expect } from 'chai';
import { createMockedPlayer } from './utils';

import { playAudio } from '../src/components/AudioPlayer/utils';
import Constants from '../src/components/AudioPlayer/utils/constants';

describe("Actions", () => {
    describe("Play", () => {
        let mockedPlayer = createMockedPlayer({ paused: true });

        it("When calling `playAudio` should return an Object", done => {
            const status = playAudio(mockedPlayer);

            expect(status).to.be.a("object");
            done();
        });

        it("When calling `playAudio` should return an Object that has a property called `playStatus`", done => {
            const status = playAudio(mockedPlayer);

            expect(status).to.have.property('playStatus');
            done();
        });

        it("When calling `playAudio` should return an Object that has a property called `playStatus` which is a String", done => {
            const status = playAudio(mockedPlayer);

            expect(status.playStatus).to.be.a("string");
            done();
        });

        it("When calling `playAudio` and player.paused is true, should return an Object that has a property called `playStatus` with value `play`", done => {
            const status = playAudio(mockedPlayer);

            expect(status.playStatus).to.be.equal(Constants.Status.PLAY);
            done();
        });

        it("When calling `playAudio` and player.paused is false, should return an Object that has a property called `playStatus` with value `pause`", done => {
            mockedPlayer = createMockedPlayer({ paused: false });
            const status = playAudio(mockedPlayer);

            expect(status.playStatus).to.be.equal(Constants.Status.PAUSE);
            done();
        });
    });
});