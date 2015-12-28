import React from 'react'
import { Router as ReactRouter } from 'react-router'
import Location from 'react-router/lib/Location'
import History from 'react-router/lib/MemoryHistory'

export default function render (req, rep, layout, { payload }) {
    const { path, query } = req;
    const location = new Location(path, query);
    const history = new History(path);

    const title = 'B.BLAND'

    rep.view(layout, { title })
}