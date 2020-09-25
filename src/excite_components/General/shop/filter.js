import React, { Component } from "react";
import { Form, Select, Input } from "antd";
import axios from "axios";
const Search = Input.Search;
const { Option } = Select;
const host = "http://127.0.0.1:8000";
const slug = 'electronics'

const Brands = ['','LG','Samsung','Sony', 'Hi-Sense']
const electronic_type = ['','Audio', 'Video']


export default class FilterForm extends Component {
  state = {
    items: [],
    loading: true,
    error: null,
    search_results: [],
    loading_query: false,
    show_results: true,
    categories: [],
  };

  Get_Items = async () => {
    const endpoint = host + `/retail/item-category-list/`;
    await axios
      .get(endpoint, {
        params: {
          slug,
        },
      })
      .then((res) => {
        this.setState({
          items: res.data,
          loading: false,
        });
        console.log("items", res.data);
      });
  };

  Search_Query = (values, err) => {
    const title = values["title"] === undefined ? null : values["title"];
    const electronic_category =
      values["electronic_category"] === undefined
        ? null
        : values["electronic_category"];

    const electronic_type =
      values["electronic_type"] === undefined
        ? null
        : values["electronic_type"];
    const color = values["color"] === undefined ? null : values["color"];
    const size = values["size"] === undefined ? null : values["size"];
    const brand = values["brand"] === undefined ? null : values["brand"];
    const condition =
      values["condition"] === undefined ? null : values["condition"];
    const price = values["price"] === undefined ? null : values["price"];
    const location =
      values["Location"] === undefined ? null : values["Location"];

    if (!err) {
      const endpoint_value = "search_electronics";
      const Query_Url = host + `/retail/${endpoint_value}/`;

      axios
        .get(Query_Url, {
          params: {
            title,
            electronic_category,
            electronic_type,
            color,
            size,
            brand,
            condition,
            price,
            location,
          },
        })
        .then((res) => {
          this.setState({
            search_results: res.data,
            show_results: false,
          });
          console.log("search result", res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
    //search query contents ends here
  };

  render() {
    return (
      <>
        <Form className="form-box-width" onFinish={this.Search_Query}>
          <Form.Item></Form.Item>
          <Form.Item name="title">
            <Search placeholder=" Title " />
          </Form.Item>

          <Form.Item name="electronic_category">
            <Select placeholder="Electronic Category">
              <Option value="">None</Option>
              <Option value="Lagos">Audio</Option>
            </Select>
          </Form.Item>

          <Form.Item name="electronic_type">
            <Select placeholder="Electronic">
              {electronic_type.map((b) => (
                <>
                  <Option value={b}>{b}</Option>
                </>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="brand">
            <Select placeholder="Brand">
              {Brands.map((b) => (
                <>
                  <Option value={b}>{b}</Option>
                </>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="Location">
            <Select placeholder="Select a location">
              <Option value=""></Option>
              <Option value="Lagos">Lagos</Option>
              <Option value="Calabar">Calabar</Option>
              <Option value="Uyo">Uyo</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <div>
              <Form.Item name="Price_Range" style={{ marginBottom: 0 }}>
                <Form.Item
                  name="year"
                  style={{ display: "inline-block", width: "calc(50% - 8px)" }}
                >
                  <Input placeholder="Starting Price" />
                </Form.Item>
                <Form.Item
                  name="month"
                  style={{
                    display: "inline-block",
                    width: "calc(50% - 8px)",
                    margin: "0 8px",
                  }}
                >
                  <Input placeholder="Closing Price" />
                </Form.Item>
              </Form.Item>
            </div>
          </Form.Item>

          <Form.Item>
            <Form.Item>
              <button
                className="custom-button"
                type="primary"
                htmlType="submit"
              >
                Filter
              </button>
            </Form.Item>
          </Form.Item>
        </Form>
      </>
    );
  }
}
