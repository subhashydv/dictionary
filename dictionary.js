const Loading = (_) => React.createElement('p', null, 'Loading...');

const DefinitionWrapper = ({ definition, partOfSpeech }) => React.createElement('p', null, `${partOfSpeech} : ${definition}`);

class Dictionary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fetching: true, meaning: null };
  }

  componentDidMount() {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${this.props.word}`)
      .then((x) => x.json())
      .then(x => x[0].meanings)
      .then(x => x.map(({ definitions, partOfSpeech }) => { return { definition: definitions[0].definition, partOfSpeech } }))
      .then((meanings) => this.setState(({ fetching }) => ({ fetching: false, meaning: meanings })))
  }


  render() {
    return this.state.fetching ? React.createElement(Loading) : React.createElement('div', null, this.state.meaning.map(x => React.createElement(DefinitionWrapper, x)));
  }
}

const meaning = React.createElement(Dictionary, { word: 'world' });

ReactDOM.render(meaning, main_container)