<template>
  <div class="home">
    <div v-if="loading">
      <div class="container" style="margin-top: 10em">
        <h1>Muhamads Pizzer</h1>
      </div>
      <div
        class="d-flex justify-content-center align-items-center"
        style="position:absolute;width:100%;height:100%;top:0"
      >
        <div
          class="spinner-border"
          role="status"
          style="height:1.5em;width:1.5em"
        />
      </div>
    </div>
    <div v-else class="container" style="margin-top: 10em">
      <div class="d-flex justify-content-between flex-wrap">
        <div>
          <h1 class="mb-5">
            Muhamads Pizzer<br /><small>Unsere Angebote:</small>
          </h1>
          <ul class="list-group" style="width:400px; margin-bottom:3em">
            <ListItem
              v-for="item in angebote"
              :key="item.name"
              :name="item.name"
              :price="item.preis"
              :onClick="
                e => {
                  basket.push(item);
                }
              "
            />
          </ul>
        </div>
        <div
          v-if="basket.length != 0"
          class="card p-4"
          style="width:300px; height: fit-content"
        >
          <h4 class="mb-3">Warenkorb:</h4>

          <div class="d-flex justify-content-between">
            <div style="white-space: pre">
              <div v-for="item in orderList(basket)" :key="item[0].name">
                {{ (item[1] + "x").padEnd(5) + item[0].name }}
              </div>
            </div>
            <div style="text-align:right">
              <div v-for="item in orderList(basket)" :key="item[0].name">
                {{ item[0].preis * item[1] + "€" }}
              </div>
              <div>-----</div>
              <div><span class="mr-4">Total:</span>{{ listSum(basket) }}€</div>
            </div>
          </div>

          <a
            class="btn btn-primary mt-3"
            role="button"
            v-on:click="order = true"
            >Bestellen</a
          >
        </div>

        <div
          v-if="order"
          style="display:inherit;background-color: rgb(0 0 0 / 10%)"
          class="modal"
          tabindex="-1"
          role="dialog"
        >
          <div class="modal-dialog" role="document">
            <div
              class="modal-content shadow"
              style="margin-top: 15em; width: 300px"
            >
              <div class="modal-header">
                <h5 class="modal-title">Bestellen</h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  v-on:click="order = false"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <form v-on:submit.prevent="sendForm">
                <div class="modal-body">
                  <div class="form-group">
                    <label for="exampleInputEmail1">Name</label>
                    <input required class="form-control" id="inpName" />
                  </div>
                  <div class="form-group">
                    <label for="inpAdresse">Adresse</label>
                    <textarea
                      required
                      id="inpAdresse"
                      class="form-control"
                    ></textarea>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="submit" class="btn btn-primary">
                    Bestellen
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import ListItem from "@/components/ListItem.vue";

interface Gericht {
  name: string;
  preis: number;
}

async function submit(vm: any) {
  vm.loading = true;
  const data = {
    bestellung: vm.orderList(vm.basket),
    name: (document.getElementById("inpName") as HTMLInputElement).value,
    adresse: (document.getElementById("inpAdresse") as HTMLInputElement).value
  };
  console.log(data);
  const response = await fetch("/api/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    body: JSON.stringify(data)
  });
  console.log(response);
  vm.$router.push("confirm");
}

export default {
  name: "Home",
  components: { ListItem },
  data() {
    return {
      angebote: [
        {
          name: "Döner",
          preis: 3
        },
        {
          name: "Pizza",
          preis: 5
        }
      ] as Gericht[],
      basket: [] as Gericht[],
      order: false,
      loading: false
    };
  },
  methods: {
    orderList(list: Gericht[]) {
      const ret: { [key: string]: [Gericht, number] } = {};
      list.forEach(item => {
        if (ret[item.name] == undefined) {
          ret[item.name] = [item, 1];
        } else {
          ret[item.name][1]++;
        }
      });
      return ret;
    },
    listSum(list: Gericht[]) {
      let ret = 0;
      list.forEach(item => {
        ret += item.preis;
      });
      return ret;
    },
    sendForm: function() {
      submit(this);
    }
  }
};
</script>
