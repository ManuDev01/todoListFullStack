import gi
gi.require_version("Gtk", "3.0")
from gi.repository import Gtk, GLib

class MiAplicacionGlade(Gtk.Application):
    def __init__(self):
        super().__init__(application_id="com.example.MiAplicacionGlade", flags=0)
        self.builder = None
        self.window = None
        self.notebook = None
        self.page_counter = 0 # Para dar nombres únicos a las nuevas pestañas

    def do_activate(self):
        if not self.window:
            self.builder = Gtk.Builder()
            try:
                self.builder.add_from_file("TodoList.glade")
            except Exception as e:
                print(f"Error al cargar el archivo Glade: {e}")
                print("Asegúrate de que 'mi_interfaz.glade' existe y es un archivo Glade válido.")
                self.quit() # Salir si hay un error crítico
                return

            self.window = self.builder.get_object("mainWindow") # Asegúrate que este ID es correcto
            if not self.window:
                print("Error: No se encontró la ventana principal con el ID 'mainWindow' en el archivo Glade.")
                self.quit()
                return

            self.add_window(self.window)
            self.window.connect("destroy", self.on_window_destroy)

            # Obtener el GtkNotebook
            # Si le diste un ID a tu GtkNotebook en Glade (ej. "my_notebook"), úsalo aquí.
            # Si no le diste un ID, Glade le asigna uno por defecto como "notebook1".
            self.notebook = self.builder.get_object("pestanas") # Reemplaza "notebook1" si le pusiste otro ID
            if not self.notebook:
                print("Error: No se encontró el GtkNotebook. Asegúrate de haberle dado un ID.")
                self.quit()
                return

            # Conectar la señal "switch-page" del notebook
            # Esta señal se emite cuando el usuario cambia de pestaña
            self.notebook.connect("switch-page", self.on_notebook_switch_page)

            # ----- Lógica para manejar pestañas dinámicas -----
            # Obtener el número de pestañas iniciales definidas en Glade
            self.initial_pages_count = self.notebook.get_n_pages()

            # Asegurarse de que la última pestaña (la de '+') no se pueda cerrar visualmente
            # El botón de cerrar se dibuja por GtkNotebook si tab-closable es True.
            # No hay una propiedad para deshabilitarlo por pestaña, así que esto es una limitación visual.
            # La lógica de eliminación de pestañas sí considerará no eliminar la última.

            # Crear el resto de la interfaz (si tienes más widgets fuera del notebook)
            # Ejemplo: Puedes tener un GtkBox en la ventana que contenga el notebook
            # main_box = self.builder.get_object("main_box_id")
            # if main_box:
            #     main_box.pack_start(self.notebook, True, True, 0)


        self.window.show_all()

        # Hacer editables los nombres de las pestañas iniciales (excepto '+')
        for i in range(self.notebook.get_n_pages() - 1):
            tab_label = self.notebook.get_tab_label(self.notebook.get_nth_page(i))
            if isinstance(tab_label, Gtk.Label):
                self.make_tab_label_editable(tab_label, i)

    def on_notebook_switch_page(self, notebook, page, page_num):
        # Esta función se llama cuando el usuario cambia de pestaña.
        # Aquí detectamos si se ha pulsado la "pestaña de añadir".

        if page_num == self.notebook.get_n_pages() - 1: # Si es la última pestaña (la de '+')
            print("Pestaña '+' (Añadir) seleccionada.")
            self.add_new_tab()
            # Usar GLib.idle_add para seleccionar la nueva pestaña después de que GTK procese la adición
            GLib.idle_add(lambda: self.notebook.set_current_page(self.notebook.get_n_pages() - 2))
        else:
            print(f"Cambiado a la página: {page_num}")
        # Aquí puedes agregar lógica específica para cada pestaña si lo necesitas
        # (ej. cargar datos, actualizar vistas)

    def add_new_tab(self):
        self.page_counter += 1
        new_page_label = f"Nueva Pestaña {self.page_counter}"

        # Crear el contenido de la nueva pestaña (ej. un GtkBox)
        new_content_box = Gtk.Box(orientation=Gtk.Orientation.VERTICAL, spacing=6)
        new_content_box.set_hexpand(True)
        new_content_box.set_vexpand(True)
        new_content_box.set_border_width(10) # Un poco de espacio
        
        # Añadir un Label de ejemplo dentro de la nueva pestaña
        example_label = Gtk.Label(label=f"Contenido de '{new_page_label}'")
        new_content_box.pack_start(example_label, False, False, 0)
        
        # Puedes añadir otros widgets aquí, como botones, entradas, etc.
        # example_button = Gtk.Button(label="Un Botón")
        # new_content_box.pack_start(example_button, False, False, 0)

        # Añadir el botón de añadir tarea al crear una nueva pestaña
        btn_agregar_tarea = Gtk.Button()
        btn_agregar_tarea.set_tooltip_text("Añadir nueva tarea")
        btn_agregar_tarea.set_halign(Gtk.Align.END)
        btn_agregar_tarea.set_valign(Gtk.Align.END)
        image = Gtk.Image.new_from_icon_name("list-add-symbolic", Gtk.IconSize.BUTTON)
        btn_agregar_tarea.set_image(image)
        btn_agregar_tarea.set_property("receives-default", False)
        new_content_box.pack_end(btn_agregar_tarea, False, False, 0)

        new_content_box.show_all() # Asegúrate de que el contenido sea visible

        # Crear la etiqueta de la pestaña
        tab_label_text = Gtk.Label(label=new_page_label)
        tab_label_text.show_all()

        # Añadir la nueva pestaña al GtkNotebook
        # Insertamos la nueva pestaña JUSTO ANTES de la última pestaña (la de '+')
        position_to_insert = self.notebook.get_n_pages() - 1
        self.notebook.insert_page(new_content_box, tab_label_text, position_to_insert)
        self.make_tab_label_editable(tab_label_text, position_to_insert)
        
        # Habilitar el botón de cierre para la nueva pestaña
        # Esta propiedad se establece en Glade para todo el Notebook, no se puede por pestaña individual
        # self.notebook.set_tab_reorderable(new_content_box, True) # Opcional: hacerla reordenable

        print(f"Pestaña '{new_page_label}' añadida.")
        # Opcional: seleccionar la nueva pestaña automáticamente
        self.notebook.set_current_page(position_to_insert)

    def make_tab_label_editable(self, tab_label_widget, page_num):
        # Permite editar el nombre de la pestaña al hacer doble clic
        def on_label_button_press(widget, event, page_num=page_num):
            if event.type == Gdk.EventType._2BUTTON_PRESS:
                entry = Gtk.Entry()
                entry.set_text(widget.get_text())
                entry.set_width_chars(15)
                entry.set_activates_default(True)
                entry.grab_focus()
                
                def on_entry_activate(entry):
                    new_text = entry.get_text()
                    new_label = Gtk.Label(label=new_text)
                    new_label.show()
                    self.make_tab_label_editable(new_label, page_num)
                    self.notebook.set_tab_label(self.notebook.get_nth_page(page_num), new_label)
                
                def on_entry_focus_out(entry, event):
                    on_entry_activate(entry)
                
                entry.connect('activate', on_entry_activate)
                entry.connect('focus-out-event', on_entry_focus_out)
                self.notebook.set_tab_label(self.notebook.get_nth_page(page_num), entry)
                entry.show()
        from gi.repository import Gdk
        tab_label_widget.add_events(Gdk.EventMask.BUTTON_PRESS_MASK)
        tab_label_widget.connect('button-press-event', on_label_button_press)

    def on_window_destroy(self, widget):
        self.quit()

if __name__ == "__main__":
    app = MiAplicacionGlade()
    exit_status = app.run(None)
    print(f"La aplicación terminó con el código de salida: {exit_status}")