import React from 'react';
import ParamButton from '../Button/ParamButton';
import ColumnsLayout from '../ColumnsLayout/ColumnsLayout';
import ColumnTitle from '../ColumnTitle/ColumnTitle';
import ParamKnob from '../Knob/ParamKnob';
import TitledGroup from '../TitledGroup/TitledGroup';
import WaveGrid from '../WaveGrid/WaveGrid';
import WaveIcon from '../WaveIcon/WaveIcon';

const LFOEditor = ({ mode, lfoNo }) => {
    const pathBase = `${mode}.lfoParams[${lfoNo}]`;

    return (
        <>
            <ColumnTitle>LFO {lfoNo + 1}</ColumnTitle>
            <TitledGroup title="PERIOD (ms)">
                <ParamKnob path={`${pathBase}.periodMS`} />
            </TitledGroup>
            <TitledGroup title="WAVE">
                <WaveGrid columnCount={3}>
                    <ParamButton path={`${pathBase}.wave`} set={0}>
                        <WaveIcon shape={31} />
                    </ParamButton>
                    <ParamButton path={`${pathBase}.wave`} set={1}>
                        <WaveIcon shape={32} />
                    </ParamButton>
                    <ParamButton path={`${pathBase}.wave`} set={2}>
                        <WaveIcon shape={33} />
                    </ParamButton>
                    <ParamButton path={`${pathBase}.wave`} set={3}>
                        <WaveIcon shape={34} />
                    </ParamButton>
                    <ParamButton path={`${pathBase}.wave`} set={4}>
                        <WaveIcon shape={35} />
                    </ParamButton>
                </WaveGrid>
            </TitledGroup>
            <TitledGroup title="FLAGS">
                <ColumnsLayout stretchH>
                    <ParamButton path={`${pathBase}.sync`} toggle>
                        SYNC
                    </ParamButton>
                    <ParamButton path={`${pathBase}.oneShot`} toggle>
                        1
                    </ParamButton>
                </ColumnsLayout>
            </TitledGroup>
        </>
    );
};

export default LFOEditor;
