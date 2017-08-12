abstract class BaseController {

    abstract model: any;

    getAllDocuments = (req, res) => {
        this.model.find({}, (err, docs) => {
            if (err) {
                return res.status(500).send({
                    status: false,
                    raise: `error at request ${err}`} );
            }
            if (!docs) {
                return res.status(404).send({
                    status: false,
                    raise: 'Documents not exist'});
            }

            res.status(200).send({ docs, status: true });
        });
    }

    getDocument = (req, res) => {
        this.model.find({}, (err, doc) => {
            if (err) {
                return res.status(500).send({
                    status: false,
                    raise: `error at request ${err}`});
            }
            if (!doc) {
                return res.status(404).send({
                    status: false,
                    raise: 'document not exist'});
            }

            res.send(200, { doc, status: true });
        });
    }

    deleteDocument = (req, res) => {
        let docid: number | string;
        docid = req.params.docid;
        // console.log(pid);
        this.model.findById(+docid, (err, doc) => {
            if (err) {
                return res.status(500).send({
                    status: false,
                    raise: `Error ${err}`});
            }
            if (!doc) {
                return res.status(404).send({
                    status: false,
                    raise: `Document not found`});
            }
            // console.log(product);
            doc.remove(derr => {
                if (!derr) {
                    return res.status(500).send({
                        status: false,
                        raise: `Error at remove document ${derr}`});
                }
                res.status(200).send({
                    status: true,
                    message: 'Document has been deleting'});
            });
        });
    }
}


export { BaseController };
