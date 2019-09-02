Vue.component('membership-actions', {
  props: {
    joined: Boolean
  },
  data: function() {
    return {
      username: ''
    }
  },
  template: '' + 
    '<div class="chat-controls">' + 
    '  <div class="row">' + 
    '    <div class="input-field col s9">' + 
    '      <input v-model="username" type="text" class="validate" :disabled="joined">' + 
    '      <label for="username">Your name</label>' + 
    '    </div>' + 
    '    <div class="input-field col s3">' + 
    '      <a v-if="!joined" class="waves-effect waves-light btn" @click="connectAndJoin" :disabled="username.length === 0">Join</a>' + 
    '      <a v-else class="waves-effect waves-light btn" @click="handleLeave">Leave</a>' + 
    '    </div>' + 
    '</div>',
  methods: {
    connectAndJoin: function() {
      this.$emit('connectAndJoin', this.username);
    },
    handleLeave: function() {
      this.$emit('leave');
    }
  }
});

Vue.component('chat-messages', {
  props: {
    messages: Array
  },
  template: '' + 
    '<div>' +
    '  <nav>' + 
    '    <div id="chat-title" class="nav-wrapper"><span>Chat Messages</span></div>' + 
    '  </nav>' + 
    '  <div class="card chat-messages">' + 
    '    <div ref="scroller" class="card-content">' + 
    '      <ul class="collection">' + 
    '        <chat-message v-for="message in messages" :message="message" />' +
    '      </ul>' +
    '    </div>' + 
    '  </div>' +
    '</div>',
  watch: {
    messages: function(value, oldValue) {
      if (!oldValue || oldValue.length < value.length) {
        $(this.$refs.scroller).scrollTop(this.$refs.scroller.scrollHeight);
      }
    }
  }
});

Vue.component('chat-message', {
  props: {
    message: Object
  },
  template: '' + 
    '<li class="collection-item avatar">' +
    '  <i class="material-icons circle green">person</i>' +
    '  <span class="title">{{ message.username }}</span>' +
    '  <p>{{ message.message }}</p>' +
    '  <span class="secondary-content">{{ displayDate }}</span>' +
    '</li>',
  computed: {
    displayDate: function() {
      return moment(this.message.timestamp).format('h:mm a');
    }
  },
});

Vue.component('chat-input', {
  props: {
    inputAllowed: Boolean
  },
  data: function() {
    return {
      messageText: ''
    };
  },
  template: '' + 
    '<div class="chat-input-containers">' +
    '  <input type="text" placeholder="Enter message" v-model="messageText" :disabled="!inputAllowed" @keyup.enter="handleSubmit" />' + 
    '<div>',
  methods: {
    handleSubmit() {
      this.$emit('submit', this.messageText);
      this.messageText = '';
    }
  }
});