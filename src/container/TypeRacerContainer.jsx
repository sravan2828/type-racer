import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import { addRacerText } from '../redux/Actions';
import TypeRacer from "../components/TypeRacer";

class RepositoriesList extends Component {
  componentDidMount(){
    const { addRacerText } = this.props;
    axios.get('http://www.randomtext.me/api/')
      .then(function (response) {
        //console.log(response.data);
        addRacerText(response.data.text_out.replace(/<\/?[^>]+(>|$)/g, ""));
    })
      .catch(function (error) {
        console.log(error);
    });
  }

  render() {
    const { text } = this.props;
    return (
     <div>
         {text && <TypeRacer text = {text}/>}
     </div>
    );
  }

}

const mapStateToProps = (state) => {
  const { text } = state.racer;
  return { text };
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    addRacerText,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(RepositoriesList);