<template>
    <div id="chats">
        <div class="nav flex-column nav-pills" role="tablist" aria-orientation="vertical">
            <a class="nav-link disabled text-muted">Chats</a>
            <a class="nav-link small active" href="">General</a>
            <a class="nav-link small" href="">Random</a>
            <a class="nav-link small" href="">Spam</a>
        </div>
        <hr />
        <div class="new_channel mt-1">
            <div class="input-group mb-3">
                <input type="text" class="form-control form-control-sm" placeholder="New chat" aria-label="Recipient's username" aria-describedby="basic-addon2">
                <div class="input-group-append">
                    <button class="btn btn-outline-primary btn-sm" type="button">
                        Save
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>