import React, { Component } from "react";
import Sidebar from "../layouts/sidebar/Sidebar";
import PageContent from "./PageContent";
import api from "../../Environment";
import renderHTML from "react-render-html";
import { translate, t } from "react-multi-lang";

class PageIndex extends Component {
  state = {
    pageData: null,
    loadingPageData: true,
    active: null,
    displayContent: null,
    currentPageTitle: null,
  };
  componentDidMount() {
    this.setState({ currentPageSet: this.props.match.params.title });
    setTimeout(() => {
      this.getPageDetails();
    }, 1000);
  }

  componentWillReceiveProps(props) {
    this.setState({ currentPageSet: props.match.params.title });
    setTimeout(() => {
      this.getPageDetails();
    }, 1000);
  }

  getPageDetails = () => {
    api.postMethod("pages_list").then((response) => {
      if (response.data.success) {
        this.setState({
          pageData: response.data.data,
          loadingPageData: false,
        });
        setTimeout(() => {
          if (this.state.pageData.length > 0) {
            var currentPageSet = false;
            this.state.pageData.map((pageDetails, index) => {
              if (pageDetails.unique_id == this.state.currentPageTitle) {
                this.setState({
                  active: pageDetails.page_type,
                  displayContent: pageDetails,
                });
                currentPageSet = true;
              }
            });

            if (currentPageSet == false) {
              this.setState({
                active: this.state.pageData[0].page_type,
                displayContent: this.state.pageData[0],
              });
            }
          }
        }, 2000);
      } else {
      }
    });
  };

  changePage = (event, page) => {
    event.preventDefault();
    this.setState({ displayContent: page });
  };
  render() {
    const { pageData, loadingPageData, displayContent } = this.state;
    return (
      <div className="main">
        <Sidebar />
        <div className="left-spacing1 staticpage">
          <div className="Spacer-10"></div>
          <div className="Spacer-10"></div>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  {loadingPageData ? (
                    t("loading")
                  ) : pageData.length > 0 ? (
                    <>
                      <div className="row">
                        <div className="col-md-3">
                          <ul
                            className="nav nav-tabs"
                            role="tablist"
                            id="tab-menu"
                          >
                            {pageData.map((page) => (
                              <li role="presentation" className="">
                                <a
                                  href="#terms"
                                  aria-controls="profile"
                                  role="tab"
                                  data-toggle="tab"
                                  onClick={(event) =>
                                    this.changePage(event, page)
                                  }
                                >
                                  <i className="fa fa-user"></i> {" "}
                                  <span>{page.title}</span>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="col-md-9">
                          <div className="tab-content">
                            <PageContent displayContent={displayContent} />
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    t("no_data_found")
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="Spacer-10"></div>
        </div>
      </div>
    );
  }
}

export default translate(PageIndex);
