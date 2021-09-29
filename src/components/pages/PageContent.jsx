import React, { Component } from "react";
import renderHTML from "react-render-html";
import { translate, t } from "react-multi-lang";

class PageContent extends Component {
    state = {};
    render() {
        const { displayContent } = this.props;
        return (
            <div role="tabpanel" className="tab-pane active" id="privacy">
                {displayContent == null ? (
                    t("loading")
                ) : (
                    <div className="static-content">
                        <h5 className="static-head-text">
                            {displayContent.title}
                        </h5>
                        <p>{renderHTML(displayContent.description)}</p>
                    </div>
                )}
            </div>
        );
    }
}

export default translate(PageContent);
