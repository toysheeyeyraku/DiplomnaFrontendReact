import * as R from 'ramda';
import * as React from 'react';
import JSONTree from 'react-json-tree';

export interface IJsonTreeViewer {
  data: any;
  title: string;
  shouldExpandNode?: (keyPath: Array<string | number>, data: [any] | {}, level: number) => boolean;
}

export default class JsonTreeViewer extends React.Component<IJsonTreeViewer, any> {
  public renderJsonData() {
    return R.not(R.isEmpty(this.props.data)) && R.not(R.isNil(this.props.data)) ? (
      <>
        <h1>{this.props.title}</h1>
        <p>{JSON.stringify(this.props.data)}</p>
      </>
    ) : null;
  }

  public render() {
    return this.renderJsonData();
  }
}
