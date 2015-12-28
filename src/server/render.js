export default function render (req, rep, layout, { payload }) {
    const { path, query } = req

    const title = 'B.BLAND'

    rep.view(layout, { title })
}