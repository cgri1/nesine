import React from 'react';
import renderer from 'react-test-renderer';
import { Home } from '../components/Home';
import Provider from '../provider';
import { Table } from 'antd';

const component = renderer.create(
    <Provider>
        <Home
            scroll={{
                y: document.body.offsetHeight - 55
            }}
        />
    </Provider>,
);

test('Home page snapshot', () => {

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('Home page table className', () => {
    const testInstance = component.root;
    expect(testInstance.findByType(Table).props.className).toBe('virtual-table');
})