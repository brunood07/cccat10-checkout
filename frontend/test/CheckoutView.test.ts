import { mount } from "@vue/test-utils";
import CheckoutViewVue from "../src/views/CheckoutView.vue";

test("Deve testar a tela de checkout", function () {
  const wrapper = mount(CheckoutViewVue, {});
  expect(wrapper.get(".title-name").text()).toBe("Checkout");
  expect(wrapper.findAll(".product")).toHaveLength(3);
  expect(wrapper.findAll(".product").at(0)?.text()).toBe("A");
  expect(wrapper.findAll(".product").at(1)?.text()).toBe("B");
  expect(wrapper.findAll(".product").at(2)?.text()).toBe("C");
});
