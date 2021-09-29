import React, { Component } from "react";

import CookieConsent, { Cookies } from "react-cookie-consent";

import { Router, Switch, Route, Redirect } from "react-router-dom";

// import createHistory from "history/createBrowserHistory";

import { createBrowserHistory as createHistory } from "history";

//Layouts

// Seventh layout pages

import { ToastProvider } from "react-toast-notifications";

import { Elements, StripeProvider } from "react-stripe-elements";

import HomeIndex from "./components/homePage/HomeIndex";
import HomeLayout from "./components/layouts/HomeLayout";
import BroadcastIndex from "./components/broadcastPage/BroadcastIndex";
import SubscriptionPlans from "./components/accounts/subscription/SubscriptionPlans";
import MySubscriptionPlan from "./components/accounts/subscription/MySubscriptionPlan";
import AddCard from "./components/accounts/cards/AddCard";
import DisplayCard from "./components/accounts/cards/DisplayCard";
import FollowerIndex from "./components/accounts/followers/FollowerIndex";
import FollowingIndex from "./components/accounts/following/FollowingIndex";
import ProfileIndex from "./components/accounts/profile/ProfileIndex";
import SearchIndex from "./components/search/SearchIndex";
import RedeemIndex from "./components/accounts/redeems/RedeemIndex";
import OtherProfileIndex from "./components/othersProfile/OthersProfileIndex";
import StreamHistoryIndex from "./components/accounts/history/livestreamHistory/StreamHistoryIndex";
import Settings from "./components/accounts/settings/Settings";
import NotificationIndex from "./components/accounts/notification/NotificationIndex";
import LiveTvViewAllIndex from "./components/liveTv/viewAllPage/LiveTvViewAllIndex";
import SinglePageIndex from "./components/liveTv/singlePage/SinglePageIndex";
import PaidStreamIndex from "./components/accounts/history/paidStreamingHistory/PaidStreamIndex";
import VodHistoryIndex from "./components/accounts/history/vodHistory/VodHistoryIndex";
import VodListIndex from "./components/vod/vodList/VodListIndex";
import OtherVodViewAllIndex from "./components/vod/otherVodVideos/viewAllPage/OtherVodViewAllIndex";
import OtherVodSinglePageIndex from "./components/vod/otherVodVideos/singlePage/OtherVodSinglePageIndex";
import UploadVideoIndex from "./components/vod/uploadVideo/UploadVideoIndex";
import ViewSingleGroupIndex from "./components/groups/viewSingleGroup/ViewSingleGroupIndex";
import CreateGroupIndex from "./components/groups/createGroup/CreateGroupIndex";
import ViewGroupsIndex from "./components/groups/viewGroups/ViewGroupsIndex";
import ViewSingleVodIndex from "./components/vod/viewSingleVod/ViewSingleVodIndex";
import CreateLiveTv from "./components/liveTv/myLiveTv/createLiveTv/CreateLiveTv";
import LiveTvListIndex from "./components/liveTv/myLiveTv/liveTvList/LiveTvListIndex";
import EditLiveTv from "./components/liveTv/myLiveTv/editLiveTv/EditLiveTv";
import SingleLiveTvIndex from "./components/liveTv/myLiveTv/singleLiveTv/SingleLiveTvIndex";
import Logout from "./components/auth/Logout";
import LiveStreamingListIndex from "./components/liveStreamingHistory/LiveStreamingList/LiveStreamingListIndex";
import LiveStreamingSingleViewIndex from "./components/liveStreamingHistory/liveStreamingSingleView/LiveStreamingSingleViewIndex";
import InvoiceIndex from "./components/paymentPage/liveTvInvoice/InvoiceIndex";
import RevenueIndex from "./components/accounts/revenue/RevenueIndex";
import SubscriptionInvoiceIndex from "./components/paymentPage/subscriptionInvoice/SubscriptionInvoiceIndex";
import VodInvoiceIndex from "./components/paymentPage/vodInvoice/VodInvoiceIndex";
import EditVodVideoIndex from "./components/vod/editVodVideo/EditVodVideoIndex";
import ArtistIndex from "./components/artists/ArtistIndex";

import configuration from "react-global-configuration";
import { apiConstants } from "./components/Constant/constants";
import { Helmet } from "react-helmet";
import PageIndex from "./components/pages/PageIndex";

import Refferral from "./components/Refferral/Refferral"

import {
  setTranslations,
  setDefaultLanguage,
  translate,
  setLanguage,
} from "react-multi-lang";
import en from "./components/translation/en.json";
import pt from "./components/translation/pt.json";

setTranslations({ pt,en });
setDefaultLanguage('en');

const history = createHistory();

const $ = window.$;
const AppRoute = ({
  component: Component,
  layout: Layout,
  screenProps: ScreenProps,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => (
      <Layout screenProps={ScreenProps} {...props}>
        <Component {...props} />
      </Layout>
    )}
    isAuthed
  />
);

const PrivateRoute = ({
  component: Component,
  layout: Layout,
  screenProps: ScreenProps,
  authentication,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      authentication === true ? (
        <Layout screenProps={ScreenProps}>
          <Component {...props} authRoute={true} />
        </Layout>
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);
class App extends Component {
  constructor(props) {
    super(props);
    let userId = localStorage.getItem("userId");
    let accessToken = localStorage.getItem("accessToken");
    this.state = {
      loading: true,
      configLoading: true,
      authentication: userId && accessToken ? true : false,
    };

    history.listen((location, action) => {
      userId = localStorage.getItem("userId");

      accessToken = localStorage.getItem("accessToken");

      this.setState({
        loading: true,
        authentication: userId && accessToken ? true : false,
      });

      // this.setState({ loading: true, authentication: true });

      // this.loadingFn();

      document.body.scrollTop = 0;
    });

    this.fetchConfig();
  }

  async fetchConfig() {
    const response = await fetch(apiConstants.settingsUrl);
    const configValue = await response.json();

    configuration.set({ configData: configValue.data }, { freeze: false });
    this.setState({ configLoading: false });

    $("#google_analytics").html(
      configuration.get("configData.google_analytics")
    );

    $("#header_scripts").html(configuration.get("configData.header_scripts"));

    $("#body_scripts").html(configuration.get("configData.body_scripts"));
  }

  componentDidMount() {
    let userLanguage = localStorage.getItem("lang")
      ? localStorage.getItem("lang")
      : "en";
    console.log(userLanguage);
    localStorage.setItem("lang", userLanguage);
    setLanguage(userLanguage);
    // console.log("Google", configuration.get("configData"));
  }

  render() {
    const isLoading = this.state.configLoading;

    if (isLoading) {
      return (
        <div className="wrapper">
          <div className="loader-warpper">
            <div id="loader">
              <p>Project setting up</p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        <Helmet>
          <title>{configuration.get("configData.site_name")}</title>
          <link
            rel="icon"
            type="image/png"
            href={configuration.get("configData.site_icon")}
            sizes="16x16"
          />
          <meta
            name="description"
            content={configuration.get("configData.meta_description")}
          ></meta>
          <meta
            name="keywords"
            content={configuration.get("configData.meta_keywords")}
          ></meta>
          <meta
            name="author"
            content={configuration.get("configData.meta_author")}
          ></meta>


          <meta property="og:title" content={configuration.get("configData.meta_title")}></meta>
          <meta property="og:description" content={configuration.get("configData.meta_description")}></meta>
          <meta property="og:image" content={configuration.get("configData.site_logo")}></meta>

          <meta itemprop="name" content={configuration.get("configData.site_name")}></meta>
          <meta itemprop="description" content={configuration.get("configData.meta_description")}></meta>
          <meta itemprop="image" content={configuration.get("configData.site_logo")}></meta>


          <meta property="twitter:card" content={configuration.get("configData.meta_description")}></meta>
          <meta property="twitter:url" content={configuration.get("configData.twitter_link")}></meta>
          <meta property="twitter:title" content={configuration.get("configData.meta_title")}></meta>
          <meta property="twitter:description" content={configuration.get("configData.meta_description")}></meta>
          <meta property="twitter:image" content="https://admin-streamnow.appswamy.com/helpsocial/twitter.png"></meta>




        </Helmet>
        <CookieConsent
          // disableStyles={true}
          location="bottom"
          // buttonClasses="btn btn-primary"
          containerClasses="col-lg-6"
          // contentClasses="text-capitalize"
          buttonText="Okay"
          cookieName="cookiesAccept"
          style={{ background: "#2B373B" }}
          expires={1500}
        >
          The site uses to provide you with a great experience. By using
          {configuration.get("configData.site_name")} , you accept our{" "}
          <a hre="/page/privacy" target="_blank">
            {" "}
            Cookies Policy{" "}
          </a>
        </CookieConsent>
        <ToastProvider>
          <Router history={history}>
            <Switch>
              {/*** Layout 1 - Transparent Fixed Header and Floating Footer ****/}

              <AppRoute
                exact
                path={"/"}
                component={HomeIndex}
                layout={HomeLayout}
              />
              <PrivateRoute
                authentication={this.state.authentication}
                path={"/broadcast"}
                component={BroadcastIndex}
                layout={HomeLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/subscriptions"}
                component={SubscriptionPlans}
                layout={HomeLayout}
              />
              <PrivateRoute
                authentication={this.state.authentication}
                path={"/my-subscription-plans"}
                component={MySubscriptionPlan}
                layout={HomeLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/cards"}
                component={DisplayCard}
                layout={HomeLayout}
              />
              <AppRoute
                path={"/follower"}
                component={FollowerIndex}
                layout={HomeLayout}
              />
              <AppRoute
                path={"/following"}
                component={FollowingIndex}
                layout={HomeLayout}
              />
              <PrivateRoute
                authentication={this.state.authentication}
                path={"/account"}
                component={ProfileIndex}
                layout={HomeLayout}
              />
              <PrivateRoute
                authentication={this.state.authentication}
                path={"/settings"}
                component={Settings}
                layout={HomeLayout}
              />

              <AppRoute
                path={"/search"}
                component={SearchIndex}
                layout={HomeLayout}
              />
              <PrivateRoute
                authentication={this.state.authentication}
                path={"/redeem"}
                component={RedeemIndex}
                layout={HomeLayout}
              />
              <AppRoute
                path={"/profile/:user_unique_id"}
                component={OtherProfileIndex}
                layout={HomeLayout}
              />
              <PrivateRoute
                authentication={this.state.authentication}
                path={"/live-streaming/history/list"}
                component={LiveStreamingListIndex}
                layout={HomeLayout}
              />
              <AppRoute
                path={"/live-streaming/single-view/:title"}
                component={LiveStreamingSingleViewIndex}
                layout={HomeLayout}
              />
              <AppRoute
                path={"/live-tv/view-all"}
                component={LiveTvViewAllIndex}
                layout={HomeLayout}
              />
              <AppRoute
                path={"/live-tv/single-view/:title"}
                component={SinglePageIndex}
                layout={HomeLayout}
              />
              <PrivateRoute
                authentication={this.state.authentication}
                path={"/live-tv/list"}
                component={LiveTvListIndex}
                layout={HomeLayout}
              />
              <PrivateRoute
                authentication={this.state.authentication}
                path={"/live-tv/create"}
                component={CreateLiveTv}
                layout={HomeLayout}
              />
              <PrivateRoute
                authentication={this.state.authentication}
                path={"/live-tv/edit/:title"}
                component={EditLiveTv}
                layout={HomeLayout}
              />
              <PrivateRoute
                authentication={this.state.authentication}
                path={"/live-tv/single/:title"}
                component={SingleLiveTvIndex}
                layout={HomeLayout}
              />

              <AppRoute
                path={"/all-notification"}
                component={NotificationIndex}
                layout={HomeLayout}
              />
              <PrivateRoute
                authentication={this.state.authentication}
                path={"/live-streaming-history"}
                component={StreamHistoryIndex}
                layout={HomeLayout}
              />
              <PrivateRoute
                authentication={this.state.authentication}
                path={"/paid-live-streaming-history"}
                component={PaidStreamIndex}
                layout={HomeLayout}
              />
              <PrivateRoute
                authentication={this.state.authentication}
                path={"/vod-history"}
                component={VodHistoryIndex}
                layout={HomeLayout}
              />

              <AppRoute
                path={"/vod/video-list"}
                component={OtherVodViewAllIndex}
                layout={HomeLayout}
              />
              <AppRoute
                path={"/vod/single/:title"}
                component={OtherVodSinglePageIndex}
                layout={HomeLayout}
              />

              <AppRoute
                path={"/refferral"}
                component={Refferral}
                layout={HomeLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/vod/list"}
                component={VodListIndex}
                layout={HomeLayout}
              />
              <PrivateRoute
                authentication={this.state.authentication}
                path={"/vod/upload"}
                component={UploadVideoIndex}
                layout={HomeLayout}
              />
              <PrivateRoute
                authentication={this.state.authentication}
                path={"/vod/edit/:title"}
                component={EditVodVideoIndex}
                layout={HomeLayout}
              />
              <PrivateRoute
                authentication={this.state.authentication}
                path={"/vod/single-view/:title"}
                component={ViewSingleVodIndex}
                layout={HomeLayout}
              />
              <PrivateRoute
                authentication={this.state.authentication}
                path={"/group/single-view/:id"}
                component={ViewSingleGroupIndex}
                layout={HomeLayout}
              />
              <PrivateRoute
                authentication={this.state.authentication}
                path={"/group/view-all"}
                component={ViewGroupsIndex}
                layout={HomeLayout}
              />
              <PrivateRoute
                authentication={this.state.authentication}
                path={"/group/create"}
                component={CreateGroupIndex}
                layout={HomeLayout}
              />
              <AppRoute
                path={"/logout"}
                component={Logout}
                layout={HomeLayout}
              />
              <AppRoute
                path={"/page/:title"}
                component={PageIndex}
                layout={HomeLayout}
              />
              <PrivateRoute
                authentication={this.state.authentication}
                path={"/invoice"}
                component={InvoiceIndex}
                layout={HomeLayout}
              />
              <PrivateRoute
                authentication={this.state.authentication}
                path={"/subscription/invoice"}
                component={SubscriptionInvoiceIndex}
                layout={HomeLayout}
              />
              <PrivateRoute
                authentication={this.state.authentication}
                path={"/vod/invoice"}
                component={VodInvoiceIndex}
                layout={HomeLayout}
              />
              <PrivateRoute
                authentication={this.state.authentication}
                path={"/revenue-dashboard"}
                component={RevenueIndex}
                layout={HomeLayout}
              />
              <PrivateRoute
                authentication={this.state.authentication}
                path={"/artists"}
                component={ArtistIndex}
                layout={HomeLayout}
              />
              <StripeProvider apiKey={configuration.get(
                "configData.stripe_publishable_key"
              )}>
                <Elements>
                  <PrivateRoute
                    authentication={this.state.authentication}
                    path={"/add-card"}
                    component={AddCard}
                    layout={HomeLayout}
                  />
                </Elements>
              </StripeProvider>
            </Switch>
          </Router>
        </ToastProvider>
      </div>
    );
  }
}

export default App;
